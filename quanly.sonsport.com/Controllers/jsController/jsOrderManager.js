﻿var orderManager = {
    DeleteOrderDetails: function (url) {
        bootbox.confirm('Bạn có muốn hủy sân này không?', (result) => {
            if (result) {
                $.get(url, function (resposne) {
                    if (resposne.Type=="success") {
                        var PlaceId = $('#PlaceId').val();
                        sessionStorage.setItem('PlaceIdSelected', PlaceId);
                        location.reload();
                    }
                });
            }
        });

    },
    CaculatorPrice: function () {
        var start = parseInt($('#StartTime').val());
        var end = parseInt($('#EndTime').val());
        var YardId = $('#YardId').val();
        var total = 0;
        if (end < start) {
            total = -1;
        }
        else {
            $.get('/OrderManager/CaculatorPrice?start=' + start + '&end=' + end + '&YardId=' + YardId, function (response) {
                if (response.success) {
                    $('#Price').prop('value', response.totalprice);
                }
            })
        }
        $('#Price').val(total);
    },
    OnDayClick: function (info) {
        var PlaceId = $('#PlaceId').val();
        const modal = $('#sonsihomodal');
        modal.find('.modal-title').text('Thêm lịch đặt sân bóng');
        const result = $('#form-result');
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        var date = Date.parse(info.dateStr);
        if (date < yesterday) {
            result.empty().html('<br/><h3 class="text-center text-warning">Không được thêm lịch vào ngày trong quá khứ!</h3><br/>');
        }
        else {
            $.get('/OrderManager/LoadFormAdd?strDate=' + info.dateStr + '&PlaceId=' + PlaceId, (response) => {
                result.empty().html(response);
            });
        }
        modal.modal('show');
    },
    OnEventClick: function (info) {
        var modal = $('#sonsihomodal');
        modal.find('.modal-title').text('Thông tin chi tiết');
        const result = $('#form-result');
        const id = info.event.id;
        $.get('/OrderManager/LoadFormShow?OrderId=' + id , (response) => {
            result.empty().html(response);
        });
        modal.modal('show');
    },
    OnCalenderLoad: function (url, NowDay) {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'bootstrap'],
            locale: 'vi',
            themeSystem: 'bootstrap',
            selectable: false,
            height: 'auto',
            contentHeight: 600,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            buttonText: {
                today: 'Hôm nay',
                month: 'Tháng',
                week: 'Tuần',
                day: 'Ngày',
                list: 'Danh sách'
            },
            titleFormat: {
                month: '2-digit',
                year: 'numeric',
            },
            columnHeaderText: function (date) {
                if (date.getDay() === 1) {
                    return 'Thứ 2';
                }
                if (date.getDay() === 2) {
                    return 'Thứ 3';
                }
                if (date.getDay() === 3) {
                    return 'Thứ 4';
                }
                if (date.getDay() === 4) {
                    return 'Thứ 5';
                }
                if (date.getDay() === 5) {
                    return 'Thứ 6';
                }
                if (date.getDay() === 6) {
                    return 'Thứ 7';
                }
                if (date.getDay() === 0) {
                    return 'Chủ nhật';
                }
            },
            eventTimeFormat: {
                hour: '2-digit',
                minute: '2-digit',
            },
            displayEventEnd: true,
            defaultView: 'dayGridMonth',
            defaultDate: NowDay,
            navLinks: true, // can click day/week names to navigate views
            editable: false,
            eventLimit: true, // allow "more" link when too many events
            //Bắt sự kiện khi click vào ngày
            dateClick: function (info) {
                orderManager.OnDayClick(info);
            },
            events: url,
            eventClick: function (info) {
                orderManager.OnEventClick(info);
            },
            eventRender: function (info) {
                var tooltip = new Tooltip(info.el, {
                    title: info.event.extendedProps.description,
                    placement: 'top',
                    trigger: 'hover',
                    container: 'body'
                });
            }
        });
        calendar.render();
    },
}
