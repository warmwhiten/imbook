import React from 'react';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const db = SQLite.openDatabase('imbook.db');



async function getBookInfo (BOOKDATA) {


    console.log('getBookInfo');
    let data=[1];

    let promise = new Promise(()=>{

        db.transaction(tx=>{
            tx.executeSql('DROP TABLE bookinfo',
            [],
            (t, success)=>{console.log('drop bookinfo table success')},
            (_t, error) => {console.log('drop bookinfo tabel fail'); console.log(error)}
            )
        })

        db.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS bookinfo (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT NOT NULL, author TEXT NOT NULL, publisher TEXT NOT NULL);',
            [],
            (t, success)=>{console.log('create bookinfo table success')},
            (_t, error) => {console.log('create bookinfo tabel fail'); console.log(error)}
            )
        })

        db.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS "bookstate" ("id" INTEGER NOT NULL UNIQUE, "have" INTEGER NOT NULL, "reading" INTEGER NOT NULL, "havingform" INTEGER NOT NULL, FOREIGN KEY("id") REFERENCES "bookinfo"("id") ON DELETE CASCADE, PRIMARY KEY("id"));',
            [],
            (t, success)=>{console.log('create bookinfo table success')},
            (_t, error) => {console.log('create bookinfo tabel fail'); console.log(error)}
            )
        })

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM bookinfo', 
                [], 
                (tx, results) => {
                    console.log('select success')
                    console.log(results.rows.item())
                        
                const rows = results.rows;
                let BookInfo = [];
          
                for (let i = 0; i < rows.length; i++) {
                    BookInfo.push({
                    ...rows.item(i),
                    });
                }
                    
                data = BookInfo;
                console.log('bookinfo in database', data)
            },

            (_t, error)=>{console.log('select book info fail'); console.log(error)}
            );
            })
    })

    await promise;

    console.log('냐',data);
    return data;
      
}

function setBookInfo(title, author, publisher, isHave, isEbook, isRead){
    console.log('set bookinfo')
    let id
    db.transaction(tx=>{

        tx.executeSql(`INSERT INTO bookInfo ("title", "author", "publisher") VALUES ('${title}', '${author}', '${publisher}');`,
        [],
        (t, success)=>{console.log('insert success', success)},
        (_t, error)=> {console.log('insert fail', error)});
    })

    db.transaction(tx=>{

        tx.executeSql(`SELECT last_insert_rowid()`,
        [],
        (t, result)=> {console.log('lastid',result.rows.item(0)["last_insert_rowid()"]); id=result.rows.item(0)["last_insert_rowid()"]},
        (_t, error)=>{console.log('select last insert id fail'), console.log(error)});
    })



    db.transaction(tx=>{

        tx.executeSql(`INSERT INTO bookstate ("book_id","have", "reading", "havingform") VALUES (${id},${isHave}, ${isRead},${isEbook});`,
        [],
        (t, success)=>{console.log('insertbookstate success')},
        (_t, error)=>{console.log('insert bookstate fail'); console.log(error)})
    })

    db.transaction(tx => {
        tx.executeSql('SELECT * FROM bookstate', 
            [], 
            (tx, results) => {
                console.log('select success')
                
            const rows = results.rows;
            let Bookstate = [];
  
             for (let i = 0; i < rows.length; i++) {
                Bookstate.push({
                ...rows.item(i),
                });
            }
  
            console.log('newbookstate',Bookstate)
        },
        (_t, error)=>{console.log('select book state fail'); console.log(error)}
        );
      })

      db.transaction(tx => {
        tx.executeSql('SELECT * FROM bookinfo', 
            [], 
            (tx, results) => {
                console.log('select success')
                
            const rows = results.rows;
            let Bookstate = [];
  
             for (let i = 0; i < rows.length; i++) {
                Bookstate.push({
                ...rows.item(i),
                });
            }
  
            console.log('newbookinfo',Bookstate)
        },
        (_t, error)=>{console.log('select book state fail'); console.log(error)}
        );
      })
}

function updateBookInfo(id, title, author, publisher, isHave, isEbook, isRead){
    console.log('update bookinfo')
    console.log( 'have ebook read',isHave, isEbook, isRead)
    db.transaction(tx=>{

        tx.executeSql(`UPDATE bookInfo SET title='${title}', author='${author}', publisher='${publisher}' WHERE id=${id};`,
        [],
        (t, success)=>{console.log(' book info success')},
        (_t, error)=> {console.log('insert fail', error)});
    })
    db.transaction(tx=>{

        tx.executeSql(`UPDATE bookstate SET have='${isHave}', reading='${isRead}', havingform='${isEbook}' WHERE book_id=${id};`,
        [],
        (t, success)=>{console.log('book state update success', success)},
        (_t, error)=> {console.log('book state insert fail', error)});
        
    })
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM bookstate', 
            [], 
            (tx, results) => {
                console.log('select success')
                
            const rows = results.rows;
            let Bookstate = [];
  
             for (let i = 0; i < rows.length; i++) {
                Bookstate.push({
                ...rows.item(i),
                });
            }
  
            console.log('bookstate',Bookstate)
        },
        (_t, error)=>{console.log('select book state fail'); console.log(error)}
        );
      })

}

function getBookInfo(){
    db.transaction(tx=>{
        tx.executeSql('CREATE TABLE IF NOT EXISTS bookreport ("report_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "book_id" INTEGER NOT NULL, "report_title" TEXT NOT NULL , "report" TEXT NOT NULL, FOREIGN KEY("book_id") REFERENCES "bookinfo"("id") ON DELETE CASCADE);',
          [],
          (t, success)=>{},
          (_t, error) => {console.log('create bookreport tabel fail'); console.log(error)}
          );
      })

      db.transaction(tx => {
          tx.executeSql('SELECT * FROM bookreport INNER JOIN bookinfo ON (bookreport.book_id = bookinfo.id)', 
              [], 
              (t, results) => {                   
              const rows = results.rows;
              let BookReport = [];
        
              for (let i = 0; i < rows.length; i++) {
                  BookReport.push({
                  ...rows.item(i),
                  });
              }
              BookReport.reverse();
              setDATA(BookReport)
              resolve();
              
            },
            (_t, error)=>{console.log('select book report fail'); console.log(error)},
          );
          })
}

function deleteBookInfo(id){
    console.log('delete bookinfo')
    db.transaction(tx=>{

        tx.executeSql(`DELETE FROM bookinfo WHERE id=${id}`,
        [],
        (t, success)=>{console.log('delete success')},
        (_t, error)=> {console.log('delete fail', error)});
    })
    db.transaction(tx=>{

        tx.executeSql(`DELETE FROM bookstate WHERE book_id=${id}`,
        [],
        (t, success)=>{console.log('delete success')},
        (_t, error)=> {console.log('delete fail', error)});
    })
}

function setBookReport(book_id, reportTitle, report){
    console.log('set bookinfo')
    db.transaction(tx=>{

        tx.executeSql(`INSERT INTO bookreport ("book_id", "report_title", "report") VALUES ('${book_id}', '${reportTitle}', '${report}');`,
        [],
        (t, success)=>{console.log('insert success')},
        (_t, error)=> {console.log('insert fail', error)});
    })


    db.transaction(tx => {
        tx.executeSql('SELECT * FROM bookreport INNER JOIN bookinfo ON (bookreport.book_id = bookinfo.id)', 
            [], 
            (tx, results) => {
                console.log('select success')
                
            const rows = results.rows;
            let Bookreport = [];
  
             for (let i = 0; i < rows.length; i++) {
                Bookreport.push({
                ...rows.item(i),
                });
            }
            Bookreport.reverse();
  
            console.log('newbookreport',Bookreport)
        },
        (_t, error)=>{console.log('select book report fail'); console.log(error)}
        );
      })
}

function updateBookReport(book_id, reportTitle, report, report_id){
    console.log('set bookinfo')
    db.transaction(tx=>{

        tx.executeSql(`UPDATE bookreport SET book_id='${book_id}', report_title='${reportTitle}', report='${report}' WHERE report_id=${report_id};`,
        [],
        (t, success)=>{console.log('insert success')},
        (_t, error)=> {console.log('insert fail', error)});
    })


    db.transaction(tx => {
        tx.executeSql(`SELECT * FROM bookreport INNER JOIN bookinfo ON (bookreport.book_id = bookinfo.id) WHERE report_id=${report_id}`, 
            [], 
            (tx, results) => {
                console.log('select success')
                
            const rows = results.rows;
            let Bookreport = [];
  
             for (let i = 0; i < rows.length; i++) {
                Bookreport.push({
                ...rows.item(i),
                });
            }
            Bookreport.reverse();
  
            console.log('newbookreport',Bookreport)
        },
        (_t, error)=>{console.log('select book report fail'); console.log(error)}
        );
      })
}

function deleteBookReport(report_id){
    console.log('delete bookinfo')
    db.transaction(tx=>{

        tx.executeSql(`DELETE FROM bookreport WHERE report_id=${report_id}`,
        [],
        (t, success)=>{console.log('delete success')},
        (_t, error)=> {console.log('delete fail', error)});
    })


    db.transaction(tx => {
        tx.executeSql(`SELECT * FROM bookreport INNER JOIN bookinfo ON (bookreport.book_id = bookinfo.id) WHERE report_id=${report_id}`, 
            [], 
            (tx, results) => {
                console.log('select success')
                
            const rows = results.rows;
            let Bookreport = [];
  
             for (let i = 0; i < rows.length; i++) {
                Bookreport.push({
                ...rows.item(i),
                });
            }
            Bookreport.reverse();
  
            console.log('newbookreport',Bookreport)
        },
        (_t, error)=>{console.log('select book report fail'); console.log(error)}
        );
      })
}




export const database = {
    getBookInfo,
    setBookInfo,
    updateBookInfo,
    deleteBookInfo,
    getBookInfo,
    setBookReport,
    updateBookReport,
    deleteBookReport,
    
}