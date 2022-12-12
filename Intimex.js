$(document).ready(function () {
  
    getListSheets();
    
   
});
var listSheets = [];



function getListSheets() {

    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx-rC80WJZN0CIJaDZtIFo_HxmJNSIJiDMUbLosN2rTg8ntVllxwWG2nouOZPwwh8LJpg/exec',
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
            window.open("https://docs.google.com/spreadsheets/d/13BWkyA7_qEd7VdTa3vGtj1T-ZAm66T8D2-ek-T6GbMQ/edit?usp=sharing", "PopUpGet","toolbars=no,scrollbars=yes,status=yes,resizable=no");
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
                    pageSize: 500,
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
            url: 'https://script.google.com/macros/s/AKfycbxtcCEl9zZ9QYUNho0XkEDj14vn8JmgRGgOgYxiJqXbub1Yt6Bk2yqpCzDkLcBU9sm25Q/exec',
            beforeSend: function () {
                $('.ViewLoader1').css("display", "block");
            },
            complete: function () {
                $('.ViewLoader1').css("display", "none");
            },
            success: function (result) {
    
                listall = result;
              
                var listconSheets = listall;
                if(d.fSheets != '')
                {
                    
                var listconSheets = listall.filter(function (item) {
                    return item.Sheet == d.fSheets ;
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
                 field: "['HỢP ĐỒNG NGOẠI']", title: "HỢP ĐỒNG NGOẠI", width: "20px",
                 headerAttributes:
                 { style: "text-align: center; font-weight: bold;white-space: normal" },
                 attributes: { style: "text-align:center;" }
             },
             {
                field: "['LOẠI HÀNG']", title: "LOẠI HÀNG", width: "20px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "['SỐ LƯỢNG']", title: "SỐ LƯỢNG", width: "20px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "['KHO ĐÓNG']", title: "KHO ĐÓNG", width: "20px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "['TIẾN ĐỘ KHO']", title: "TIẾN ĐỘ KHO", width: "20px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "['GHI CHÚ']", title: "GHI CHÚ", width: "20px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "['TÀU']", title: "TÀU", width: "20px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
            
            
             ]
        return columns;
    }
    function colViewAssignReport() {
        var d = getFilter();
        var columns =
            [
            {
                field: "STT", title: "STT", width: "50px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "SubParentDescVN", title: "Vùng", width: "50px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "DescriptionVN", title: "Tỉnh thành", width: "50px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "District", title: "Quận(Huyện)", width: "50px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "Ward", title: "Phường(Xã)", width: "50px",
                headerAttributes:
                { style: "text-align: center; font-weight: bold;white-space: normal" },
                attributes: { style: "text-align:center;" }
            },
             {
                 field: "Street", title: "Tuyến đường", width: "50px",
                 headerAttributes:
                 { style: "text-align: center; font-weight: bold;white-space: normal" },
                 attributes: { style: "text-align:center;" }
             },
                {
                    field: "Name", title: "Acc phụ trách", width: "50px",
                    headerAttributes:
                    { style: "text-align: center; font-weight: bold;white-space: normal" },
                    attributes: { style: "text-align:center;" }
                },
                {
                    field: "CreateBy", title: "Acc-Thời gian cập nhật", width: "50px",
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
function ExportExcel() {
    var grid = $("#gridReport").data("kendoGrid");
    grid.options.excel.fileName = "Bao cao dong hang";
    grid.saveAsExcel();
}
