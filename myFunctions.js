$(document).ready(function() {

    $('.detail-check').change(function() {
        $(this).closest('tr').next('.details-row').fadeToggle(300);
    });

    $('#btn-continue').click(function() {
        if ($('.select-meal:checked').length > 0) {
            $('#order-form-section').slideDown();
            $('html, body').animate({
                scrollTop: $("#order-form-section").offset().top
            }, 800);
        } else {
            alert("يرجى اختيار وجبة واحدة على الأقل");
        }
    });

    $('#order-form').submit(function(e) {
        e.preventDefault();

        var fullName = $('#full-name').val();
        var nationalId = $('#national-id').val();
        var birthDate = $('#birth-date').val();
        var phone = $('#phone').val();

        var nameRegex = /^[\u0621-\u064A\s]+$/;
        if (fullName != "" && !nameRegex.test(fullName)) {
            alert("الاسم يجب أن يكون بالعربي فقط");
            return;
        }

        var idRegex = /^(0[1-9]|1[0-4])\d{9}$/;
        if (!idRegex.test(nationalId)) {
            alert("الرقم الوطني غير صحيح");
            return;
        }

        var dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/;
        if (birthDate != "" && !dateRegex.test(birthDate)) {
            alert("تاريخ الميلاد غير صحيح");
            return;
        }

        var phoneRegex = /^(09(3|8|9|4|5|6))\d{7}$/;
        if (phone != "" && !phoneRegex.test(phone)) {
            alert("رقم الهاتف غير صحيح");
            return;
        }

        var total = 0;
        var text = "الوجبات:\n";

        $('.select-meal:checked').each(function() {
            var price = parseInt($(this).data('price'));
            total += price;
            text += "- " + $(this).data('name') + "\n";
        });

        var tax = total * 0.05;
        var finalTotal = total + tax;

        alert(
            "تم الطلب\n\n" +
            text +
            "\nالمجموع: " + total +
            "\nالضريبة: " + tax +
            "\nالإجمالي: " + finalTotal
        );
    });

});