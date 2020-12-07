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
        (t, success)=>{console.log('insert success')},
        (_t, error)=> {console.log('insert fail', error)});
    })

    db.transaction(tx=>{

        tx.executeSql(`SELECT last_insert_rowid()`,
        [],
        (t, result)=> {console.log('lastid',result.rows.item(0)["last_insert_rowid()"]); id=result.rows.item(0)["last_insert_rowid()"]},
        (_t, error)=>{console.log('select last insert id fail'), console.log(error)});
    })



    db.transaction(tx=>{

        tx.executeSql(`INSERT INTO bookstate ("id","have", "reading", "havingform") VALUES (${id},${isHave}, ${isRead},${isEbook});`,
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
    
/*
        db.transaction(tx => {
        tx.executeSql('SELECT * FROM bookinfo', 
            [], 
            (tx, results) => {
                console.log('select success')
                
            const rows = results.rows;
            let BookInfo = [];
  
             for (let i = 0; i < rows.length; i++) {
                BookInfo.push({
                ...rows.item(i),
                });
            }
  
            console.log('newbookinfo',BookInfo)
        },
        (t, error)=>{console.log('select book info fail'); console.log(error)}
        );
      })

    await db.transaction(tx => {
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
  
            bookInfo=BookInfo
            console.log(bookInfo)
        },
        (t, error)=>{console.log('select book info fail'); console.log(error)}
        );
      })
*/
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
    
/*
        db.transaction(tx => {
        tx.executeSql('SELECT * FROM bookinfo', 
            [], 
            (tx, results) => {
                console.log('select success')
                
            const rows = results.rows;
            let BookInfo = [];
  
             for (let i = 0; i < rows.length; i++) {
                BookInfo.push({
                ...rows.item(i),
                });
            }
  
            console.log('newbookinfo',BookInfo)
        },
        (t, error)=>{console.log('select book info fail'); console.log(error)}
        );
      })

    await db.transaction(tx => {
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
  
            bookInfo=BookInfo
            console.log(bookInfo)
        },
        (t, error)=>{console.log('select book info fail'); console.log(error)}
        );
      })
*/
}




export const database = {
    getBookInfo,
    setBookInfo,
    setBookReport,
}