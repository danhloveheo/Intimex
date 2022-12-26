$(document).ready(function () {
  
    getListSheets();
    getListData1();
	getListData2();
	getListData3();
	//getListData4();
    
});
var listSheets = [];
var listconSheets ;
var listdata1 = [];
var listdata2 = [];
var listdata3 = [];
var listdata4 = [];
function getListSheets() {

    $.ajax({
	
        url: 'https://script.google.com/macros/s/AKfycby0lkeSUIVsYv1-ha8QUqlG_RXABCjpW1MbQCbNNelvJTlbkYwQ1zPG-ZU0ecpkwyB5Lg/exec',
        success: function (result) {

            listSheets = result;
           console.log("--");
            console.log(result);
            console.log("--");
          
        },
        error: function () {
            console.log("err");

        }
    });
}

function getListData1() {
  console.log("data1");
    $.ajax({

        url: 'https://script.google.com/macros/s/AKfycbxg0gCYehW4Va7v2ww0XL456wEJcEefl1V-f7wCLSzt-fQ-hwkkdC6YcO1K3TMKOliuVA/exec',
		
        success: function (result) {

            listdata1 = result;
            console.log("--");
            console.log(result);
            console.log("--");
           
        },
        error: function () {
            console.log("err");

        }
    });
}
function getListData2() {
   console.log("data2");
    $.ajax({

        url: 'https://script.google.com/macros/s/AKfycbwVWPZFXJogG97sEvnDxu1VcLdzQiZG47ykmeeDoG851BG5_whK0lL_4onMFhsOdSHryg/exec',
		
        success: function (result) {

            listdata2 = result;
            console.log("--");
            console.log(result);
            console.log("--");
           
        },
        error: function () {
            console.log("err");

        }
    });
}
function getListData3() {
  console.log("data3");
    $.ajax({

        url: 'https://script.google.com/macros/s/AKfycbyo3AqIYrNZrQH3DeKDvxu1a6hVC8kDHSz6uL6popqMrwlLFKfwq24SCsNXS_lX0ARj6g/exec',
		
        success: function (result) {

            listdata3 = result;
            console.log("--");
            console.log(result);
            console.log("--");
			  createControl();
           
        },
        error: function () {
            console.log("err");

        }
    });
}
function getListData4() {
  console.log("data4");
    $.ajax({
	 
        url: 'https://script.google.com/macros/s/AKfycbxSiQxFF5tAHLqmI5dF071AY4truwKjMMNmpG-6LsB7HMWqe5gUHApPQoCflh5OG2md7g/exec',
		 beforeSend: function () {
                $('.ViewLoader1').css("display", "block");
            },
            complete: function () {
                $('.ViewLoader1').css("display", "none");
            },
        success: function (result) {
			
            listdata4 = result;
            console.log("--");
            console.log(result);
            console.log("--");
         
        },
        error: function () {
            console.log("err");

        }
    });
}



function createControl() {
    $("#tabstrip").kendoTabStrip({
        animation: false,
    });

  
    $("#fSheets").kendoMultiSelectBox({
        dataTextField: 'Name',
        dataValueField: 'Value',
        dataSource: listSheets,
        autoClose: false,
        showSelectAll: true,
        emptySelectionLabel: "Chọn Sheets...",
      
    });
  
   




    $('#btnViewReport').kendoButton({
        click: function (e) {
            LoadReport();
        }
    });
    $('#btnInsertReport').kendoButton({
        click: function (e) {
            window.open("https://docs.google.com/spreadsheets/d/1nUaGrr-ygPN5zNfls8L1h8zVor8FHWNirkztDIw2DSQ/edit#gid=837559345", "PopUpGet","toolbars=no,scrollbars=yes,status=yes,resizable=no");
        }
    });

    $('#gridReport').kendoGrid({
        excel: {
            allPages: true,
            filterable: true
        },



        selectable: true,
        height: 700,
        // sortable: true,
        resizable: true,
        scrollable: true,
        //  reorderable: true,
        pageable: {
        
            buttonCount: 5,
            pageSize: 500,
            messages: {
                itemsPerPage: "dòng / trang",
                display: "Hiển thị {0} - {1} / {2}",
                empty: "Không tìm thấy dữ liệu"
            }
        },
        selectable: true,
        filterable: {
            extra: false,
            messages: { and: "và", or: "hoặc", filter: "Lọc", clear: "Hủy lọc", info: "" },
            operators: {
                string: { eq: "Bằng", neq: "Khác", startswith: "Bắt đầu từ", contains: "Chứa", doesnotcontain: "Không chứa", endswith: "Kết thúc bằng" }
                , number: { eq: "=", neq: "!=", gte: ">=", gt: ">", lte: "<=", lt: "<" }
                , date: { neq: "!=", gte: ">=", gt: ">", lte: "<=", lt: "<" }
            }
        },

    });

   

   
   

    function LoadReport() {
        var d = getFilter();
      
        var tabstrip = $('#tabstrip').data('kendoTabStrip');
        tabstrip.select(1);
        tabstrip.enable(tabstrip.select(), true);
        var grid = $('#gridReport').data("kendoGrid");
        var options = grid.options;
        options.columns = colView();
       
              
                var listconSheets = listdata1.concat(listdata2.concat(listdata3));
                var arrSheet = [];
                var myArray = d.fSheets.split(",");
                for(var i =0;i<myArray.length;i++)
                {

                    arrSheet.push(myArray[i]);
                }
                if(d.fSheets != '')
                {
                    
             
                    listconSheets = listconSheets.filter(function(item) {
                      return arrSheet.indexOf(item["Sheet"]) != -1
                    })

                    
                    
                 


                }
                if(d.fContract != '')
                {
                    
               
                    listconSheets = listconSheets.filter(function (item) {
                        return item["HĐ NGOẠI"].indexOf(d.fContract.trim()) != -1 ;
                    
                });
                }
                if(d.fBooking != '')
                {
                    
            

                    listconSheets = listconSheets.filter(function (item) {
                        return item["BOOKING/TÀU"].indexOf(d.fBooking.trim()) != -1 ;
                });
                }
   
        var dataSource = new kendo.data.DataSource({
            data: listconSheets,
            pageSize: 500,
        });
        options.dataSource = dataSource;
        $('#gridReport').empty().kendoGrid(options);
      


    }
  
    function colView() {
        var d = getFilter();
        var columns =
             [
                {
                    field: "STT", title: "STT", width: "45px",
                    headerAttributes:
                    { style: "text-align: center; font-weight: bold;white-space: normal;font-size:14px" },
                    attributes: { style: "text-align:center;font-size:14px" },
                    template: "<a href=\"javascript:; \"  onclick=\"LoadReportDetail('#=STT#','#=SheetName#')\" >#=STT# </a>",
                },
                {
                    field: "['HĐ NGOẠI']", title: "HĐ NGOẠI",
                    headerAttributes:
                    { style: "text-align: center; font-weight: bold;white-space: normal;font-size:11px" },
                    attributes: { style: "text-align:center;font-size:12px" },
                   
                },
                {
                   field: "['LOẠI HÀNG']", title: "LOẠI HÀNG", width: "90px",
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal;font-size:11px" },
                   attributes: { style: "text-align:center;font-size:12px" }
               },
               {
                   field: "['SỐ LƯỢNG']", title: "SỐ LƯỢNG",  width: "90px",
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal;font-size:11px" },
                   attributes: { style: "text-align:center;font-size:12px" }
               },
               {
                   field: "['KHO ĐÓNG']", title: "KHO ĐÓNG", 
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal;font-size:11px" },
                   attributes: { style: "text-align:center;font-size:12px" }
               },
               {
                   field: "['TIẾN ĐỘ KHO']", title: "TIẾN ĐỘ KHO", 
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal;font-size:11px" },
                   attributes: { style: "text-align:center;font-size:12px" }
               },
               {
                   field: "['BOOKING/TÀU']", title: "TÀU",
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal;font-size:11px" },
                   attributes: { style: "text-align:center;font-size:12px" }
               },
               {
                   field: "['GHI CHÚ']", title: "GHI CHÚ",  width: "300px",
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal;font-size:11px" },
                   attributes: { style: "text-align:center;font-size:12px" }
               },
               {
                   field: "['GIÁM ĐỊNH']", title: "GIÁM ĐỊNH", width: "90px",
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal;font-size:11px" },
                   attributes: { style: "text-align:center;font-size:12px" }
               },
               {
                field: "SheetName", title: "NGƯỜI PHỤ TRÁCH",width: "90px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal;font-size:11px" },
                attributes: { style: "text-align:center;font-size:12px" }
            },
           
            
            
             ]
        return columns;
    }
  
}



function getFilter() {
    var fSheets = $("#fSheets").val();
    var fContract = $("#fContract").val();
    var fBooking = $("#fBooking").val();
  

    var filter = {
        fSheets: fSheets,
        fContract: fContract,
        fBooking: fBooking
       

    }
    return filter;
}
function LoadReportDetail(id,sheetname) {
     
      
    var tabstrip = $('#tabstrip').data('kendoTabStrip');
    tabstrip.select(2);
    tabstrip.enable(tabstrip.select(), true);
    
    

    if(id != '')
    {
        
     listconSheets = listdata1.concat(listdata2.concat(listdata3)).filter(function (item) {
        return item.STT == id && item.SheetName == sheetname ;
    });
  }
   console.log(listconSheets[0]["KHO ĐÓNG"]);
    $("#txtHDNgoai").val(listconSheets[0]["HĐ NGOẠI"]);
    $("#txtLoaiHang").val(listconSheets[0]["LOẠI HÀNG"]);
    $("#txtSoLuong").val(listconSheets[0]["SỐ LƯỢNG"]);
    $("#txtKhoDong").val(listconSheets[0]["KHO ĐÓNG"]);
    $("#txtTienDoKho").val(listconSheets[0]["TIẾN ĐỘ KHO"]);
    $("#txtBooking").val(listconSheets[0]["BOOKING/TÀU"]);
    $("#txtGhiChu").val(listconSheets[0]["GHI CHÚ"]);
    $("#txtGiamDinh").val(listconSheets[0]["GIÁM ĐỊNH"]);
    $("#txtSheet").val(listconSheets[0]["SheetName"]);
    

}
function ExportExcel() {
    var grid = $("#gridReport").data("kendoGrid");
    grid.options.excel.fileName = "Bao cao dong hang";
    grid.saveAsExcel();
}
