/**
 * 
 * @param {HTMLTableElement} tabele  the table to sort
 * @param {number} column  the index of column to sort
 * @param {boolean} asc asc desc
 */


function sortTableByColumn(tabele, column, asc=true){
    const dirModifier=asc ? 1 : -1;
    const tBody=table.tBodies[0];
    const rowS=Array.from(tBody.querySelectionAll("tr"));

    //sort each row
    const sortedRows=rows.sort((a,b)=>{
        
        const aColText=a.querySelector('td:nth-child(${column+1})').textContent.trim();

        const bColText=c.querySelector('td:nth-child(${column+1})').textContent.trim();
        return aColText > bColText ? (1*dirModifier) : (-1*dirModifier);
    });

    //remowe all exist, and put new
    while(tBody.firstChild){
        tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);
    //Remember how they are sorted
    table.querySelectionAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector('th:nth-child(${column +1})').classList("th-sort-asc",asc);
    table.querySelector('th:nth-child(${column +1})').classList("th-sort-desc",!asc);
    

}

document.querySelectionAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", ()=>{
        const tabeleElement=headerCell.parentElement.parentElement.parentElement;
        const headerIndex=Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIs=headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tabeleElement, headerIndex, !currentIs);
    });
});
