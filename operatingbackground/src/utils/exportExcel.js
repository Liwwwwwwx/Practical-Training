import FileSaver from "file-saver";
import XLSX from "xlsx";

const exportExcel = function(){
    /* generate workbook object from table */

    var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
    /* get binary string as output */

    var wbout = XLSX.write(wb, {
      bookType: "xlsx",
      bookSST: true,
      type: "array"
    });
    try {
      FileSaver.saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        "数据.xlsx"
      );
    } catch (e) {
      if (typeof console !== "undefined") console.log(e, wbout);
    }
    return wbout;
    console.log(wbout)
  }

  export {
      exportExcel
  }