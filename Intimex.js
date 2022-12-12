$(document).ready(function () {
    createControl();
   


});
var listall = [];


function createControl() {
    $("#tabstrip").kendoTabStrip({
        animation: false,
    });

  

    $.ajax({
      
        url: 'https://script.google.com/macros/s/AKfycby3gPLc-c9DilLv2Tf2bt9phceRR61jyAqxf5tNJNFyBjcYwk-AwlExMCeCJH3t5Y-67Q/exec',
        success: function (result) {
            console.log(result);
            $('#fLocation').kendoDropDownList({
                dataTextField: 'Name',
                dataValueField: 'Age',
                dataSource: result,
              
            });
         

        },
        error: function () {
            var multiSelect = $('#fLocation').data('kendoDropDownList');
            alert('Vui lòng chọn Quận');
        }
    });
   
    var datafStatusAssign = [
{ text: 'Đã PC', value: '1' },
{ text: 'Chưa PC', value: '2' },

    ];
    $('#fStatusAssign').kendoDropDownList({
        dataTextField: 'text',
        dataValueField: 'value',
        dataSource: datafStatusAssign,

    });




   




    $('#btnAssign').kendoButton({
        click: function (e) {
            LoadAssign();
        }
    });
    $('#btnViewReport').kendoButton({
        click: function (e) {
            LoadAssignReport();
        }
    });


    $('#gridAssign').kendoGrid({
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
            refresh: true,
            buttonCount: 5,
            pageSize: 140,
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
        columns: [
        ],



        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSize: 140,
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

    $('#btnUpdateAssignRoute').on('click', UpdateAssignRoute);
    function UpdateAssignRoute() {
        var r = confirm('Bạn có muốn cập nhật?');
        if (r == false) {
            return;
        } else {

            var ArrUpdate = [];

            var checkErr = 0;


            var fi = getFilter();
            var displayedData = $('#gridAssign').data().kendoGrid.dataSource.view();
            var length = displayedData.length;
            console.log(displayedData);
            for (var i = 0; i < length; i++) {
                var currentDataItem = displayedData[i];

                var AccountNVVP = $('[id=dropDownTemplateNVVP][name=' + currentDataItem.STT + ']').val();
                if (currentDataItem.StaffID == null) var StaffID = "-1"
                if (AccountNVVP != StaffID
           ) {
                    ArrUpdate.push({

                        SubParentDescVN: currentDataItem.SubParentDescVN,
                        LocationID: currentDataItem.LocationID,
                        District: currentDataItem.DistrictID,
                        Ward: currentDataItem.WardID,
                        Street: currentDataItem.StreetID,
                        StaffID: AccountNVVP
                    });
                }
            }
            if (ArrUpdate.length > 0) {

                console.log(JSON.stringify(ArrUpdate));

                //  kendo.ui.progress($('#gridViewKPI'), true);
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',

                    url: '/Contract/StaffLocationAssign/InsertCaseStaffRoute',
                    data: JSON.stringify(ArrUpdate),
                    success: function (result) {
                        console.log(result.query);
                        alert("Cập nhật thành công")
                    },
                    error: function (error) {
                        console.log(error);
                        alert("Phân công thất bại! Vui lòng liên hệ ISC");
                    }
                });



            }

        }
    }
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

    function LoadAssign() {
        var d = getFilter();
        var tabstrip = $('#tabstrip').data('kendoTabStrip');
        tabstrip.select(1);
        tabstrip.enable(tabstrip.select(), true);
        var grid = $('#gridAssign').data("kendoGrid");
        var options = grid.options;
        options.columns = colViewAssign();
        $.ajax({
            url: '/Contract/StaffLocationAssign/LoadViewAssign',
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
                $('.ViewLoader1').css('display', 'block');
                kendo.ui.progress($('#gridAssign'), true);
            },
            complete: function () {
                $('.ViewLoader1').css('display', 'none');
                kendo.ui.progress($('#gridAssign'), false);
            },
            success: function (data) {
                console.log(data);
                var dataSource = new kendo.data.DataSource({
                    data: data.ds,
                    pageSize: 100,
                });
                options.dataSource = dataSource;
                $('#gridAssign').empty().kendoGrid(options);


            },
            error: function (error) {
                alert('errror: ' + error);
            }
        });


    }
    function colViewAssign() {
        var d = getFilter();
        var columns =
             [
             {
                 field: "STT", title: "STT", width: "20px",
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
                  field: "Name", title: "Acc phụ trách", width: "70px",
                  headerAttributes:
                  { style: "text-align: center; font-weight: bold;white-space: normal" },
                  template: '<input id="dropDownTemplateNVVP" name = "#=STT#" style="width: 150px;"/><br>',
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
    var fSub = $("#fSub").val();
    var fLocation = $("#fLocation").val();
    var fDistrict = $("#fDistrict").val();
    var fWard = $("#fWard").val();
    var fStreet = $("#fStreet").val();
    var fStatusAssign = $("#fStatusAssign").val();
    var fStaff = $("#fStaff").val();

    var filter = {
        fSub: fSub,
        fLocation: fLocation,
        fDistrict: fDistrict,
        fWard: fWard,
        fStreet: fStreet,
        fStatusAssign: fStatusAssign,
        fStaff: fStaff

    }
    return filter;
}

