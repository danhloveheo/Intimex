$(document).ready(function () {
  
    getListSheets();
    
   
});
var listSheets = [];
var listconSheets ;


function getListSheets() {

    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycby0lkeSUIVsYv1-ha8QUqlG_RXABCjpW1MbQCbNNelvJTlbkYwQ1zPG-ZU0ecpkwyB5Lg/exec',
        success: function (result) {

            listSheets = result;
            console.log("--");
            console.log(listSheets);
            console.log("--");
            createControl();
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

   

   
    function LoadAssignReport() {
        var d = getFilter();
        var tabstrip = $('#tabstrip').data('kendoTabStrip');
        tabstrip.select(2);
        tabstrip.enable(tabstrip.select(), true);
        var grid = $('#gridReport').data("kendoGrid");
        var options = grid.options;
        options.columns = colViewAssignReport();
        $.ajax({
            url: '/Contract/StaffLocationAssign/LoadViewAssignReport',
            data: {

                fSub: d.fSub,
                fLocation: d.fLocation,
                fDistrict: d.fDistrict,
                fWard: d.fWard,
                fStreet: d.fStreet,
                fStatusAssign: d.fStatusAssign,
                fStaff: d.fStaff

            },

            beforeSend: function () {
                $('.ViewLoader2').css('display', 'block');
                kendo.ui.progress($('#gridAssign'), true);
            },
            complete: function () {
                $('.ViewLoader2').css('display', 'none');
                kendo.ui.progress($('#gridAssign'), false);
            },
            success: function (data) {

                var dataSource = new kendo.data.DataSource({
                    data: data.ds,
                    pageSize: 2000,
                });
                options.dataSource = dataSource;
                $('#gridReport').empty().kendoGrid(options);
                $('#gridReport').data("kendoGrid").refresh();

            },
            error: function (error) {
                alert('errror: ' + error);
            }
        });


    }

    function LoadReport() {
        var d = getFilter();
      
        var tabstrip = $('#tabstrip').data('kendoTabStrip');
        tabstrip.select(1);
        tabstrip.enable(tabstrip.select(), true);
        var grid = $('#gridReport').data("kendoGrid");
        var options = grid.options;
        options.columns = colView();
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbyaT_5evfDQ8GrWb3OH8aFyEwMlIEBbw9r6YyQgJg8ZQNlAf3GdesPO4K7yqLIWogEcuQ/exec',
            beforeSend: function () {
                $('.ViewLoader1').css("display", "block");
            },
            complete: function () {
                $('.ViewLoader1').css("display", "none");
            },
            success: function (result) {
    console.log(result);
                listall = result;
              
                var listconSheets = listall;
                if(d.fSheets != '')
                {
                    
                 listconSheets = listall.filter(function (item) {
                    return item.Sheet == d.fSheets.trim() ;
                });
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
            pageSize: 100,
        });
        options.dataSource = dataSource;
        $('#gridReport').empty().kendoGrid(options);
             
            },
            error: function () {
                console.log("err");
    
            }
        });
      


    }
  
    function colView() {
        var d = getFilter();
        var columns =
             [
                {
                    field: "STT", title: "STT", width: "45px",
                    headerAttributes:
                    { style: "text-align: center; font-weight: bold;white-space: normal" },
                    attributes: { style: "text-align:center;" },
                    template: "<a href=\"javascript:; \"  onclick=\"LoadReportDetail('#=STT#')\" >#=STT# </a>",
                },
                {
                    field: "['HĐ NGOẠI']", title: "HĐ NGOẠI",
                    headerAttributes:
                    { style: "text-align: center; font-weight: bold;white-space: normal" },
                    attributes: { style: "text-align:center;" },
                   
                },
                {
                   field: "['LOẠI HÀNG']", title: "LOẠI HÀNG",
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal" },
                   attributes: { style: "text-align:center;" }
               },
               {
                   field: "['SỐ LƯỢNG']", title: "SỐ LƯỢNG", 
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal" },
                   attributes: { style: "text-align:center;" }
               },
               {
                   field: "['KHO ĐÓNG']", title: "KHO ĐÓNG", 
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal" },
                   attributes: { style: "text-align:center;" }
               },
               {
                   field: "['TIẾN ĐỘ KHO']", title: "TIẾN ĐỘ KHO", 
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal" },
                   attributes: { style: "text-align:center;" }
               },
               {
                   field: "['BOOKING/TÀU']", title: "TÀU",
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal" },
                   attributes: { style: "text-align:center;" }
               },
               {
                   field: "['GHI CHÚ']", title: "GHI CHÚ", 
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal" },
                   attributes: { style: "text-align:center;" }
               },
               {
                   field: "['GIÁM ĐỊNH']", title: "GIÁM ĐỊNH", 
                   headerAttributes:
                   { style: "text-align: center; font-weight: bold;white-space: normal" },
                   attributes: { style: "text-align:center;" }
               },
               {
                field: "SheetName", title: "NGƯỜI PHỤ TRÁCH",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
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
function LoadReportDetail(id) {
     
      
    var tabstrip = $('#tabstrip').data('kendoTabStrip');
    tabstrip.select(2);
    tabstrip.enable(tabstrip.select(), true);
    
    

    if(id != '')
    {
        
     listconSheets = listall.filter(function (item) {
        return item.STT == id ;
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
