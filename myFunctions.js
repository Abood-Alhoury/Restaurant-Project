$(document).ready(function() {
    // 1. إظهار وإخفاء تفاصيل الوجبات عند الضغط على المربع 
    $('.detail-check').change(function() {
        $(this).closest('tr').next('.details-row').fadeToggle(300);
    });

    // 2. إظهار نموذج الطلب عند الضغط على "متابعة" 
    $('#btn-continue').click(function() {
        if ($('.select-meal:checked').length > 0) {
            $('#order-form-section').slideDown();
            $('html, body').animate({
                scrollTop: $("#order-form-section").offset().top
            }, 800);
        } else {
            alert("يرجى اختيار وجبة واحدة على الأقل للمتابعة.");
        }
    });

    // 3. التحقق من صحة البيانات عند الإرسال 
    $('#order-form').submit(function(e) {
        e.preventDefault();

        const fullName = $('#full-name').val();
        const nationalId = $('#national-id').val();
        const birthDate = $('#birth-date').val();
        const phone = $('#phone').val();

        // تحقق الاسم (أحرف عربية فقط) 
        const nameRegex = /^[\u0621-\u064A\s]+$/;
        if (fullName !== "" && !nameRegex.test(fullName)) {
            alert("الاسم يجب أن يحتوي على أحرف عربية فقط.");
            return false;
        }

        // تحقق الرقم الوطني (إلزامي، 11 خانة، يبدأ بـ 01-14) 
        const idRegex = /^(0[1-9]|1[0-4])\d{9}$/;
        if (!idRegex.test(nationalId)) {
            alert("الرقم الوطني إلزامي، يجب أن يتكون من 11 خانة ويبدأ برمز محافظة صحيح (01-14).");
            return false;
        }

        // تحقق تاريخ الولادة (dd-mm-yyyy) 
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/;
        if (birthDate !== "" && !dateRegex.test(birthDate)) {
            alert("تاريخ الولادة يجب أن يكون بالتنسيق التالي: dd-mm-yyyy");
            return false;
        }

        // تحقق الموبايل (Syriatel أو MTN) 
        const phoneRegex = /^(09(3|8|9|4|5|6))\d{7}$/;
        if (phone !== "" && !phoneRegex.test(phone)) {
            alert("رقم الموبايل يجب أن يطابق شبكتي سيريتل أو MTN.");
            return false;
        }

        // حساب المبلغ والضريبة 5% وإظهار النتيجة 
        let total = 0;
        let mealsSummary = "الوجبات المختارة:\n";
        $('.select-meal:checked').each(function() {
            const price = parseInt($(this).data('price'));
            total += price;
            mealsSummary += "- " + $(this).data('name') + "\n";
        });

        const tax = total * 0.05;
        const finalTotal = total + tax;

        alert("تم قبول الطلب!\n\n" + mealsSummary + 
              "\nالمجموع: " + total.toLocaleString() + " ل.س" +
              "\nالضريبة (5%): " + tax.toLocaleString() + " ل.س" +
              "\nالمبلغ الإجمالي المترتب: " + finalTotal.toLocaleString() + " ل.س");
    });
});