function toast(type, ms) {
    try {
        Command: toastr[type](ms);
    } catch (e) {
        alert(ms);
    }
}
function direct(url) {
    setTimeout(function () {
        location.href = url;
    }, 2000);
}
function autoFormatNumber() {
    var $form = $("form");
    var $input = $form.find(".number");
    $input.on("keyup", function (event) {
        var selection = window.getSelection().toString();
        if (selection !== '') {
            return;
        }
        if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
            return;
        }
        var $this = $(this);
        var input = $this.val();
        var input = input.replace(/[\D\s\._\-]+/g, "");
        input = input ? parseInt(input, 10) : 0;
        $this.val(function () {
            return (input === 0) ? "0" : input.toLocaleString("en-US");
        });
    });
}
function formatMoney(n, c, d, t) {
    var
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    var hours = '' + d.getHours(), min = '' + d.getMinutes();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (hours.length < 2)
        hours = '0' + hours;
    if (min.length < 2)
        min = '0' + min;

    return [year, month, day].join('-') + " " + hours + ":" + min;
}
function reload() {
    setTimeout(function () {
        location.reload();
    }, 2000);
}
function goBack() {
    window.history.back();
}
function round(num, decimal) {
    var p = Math.pow(10, decimal);
    var a = Math.round(num * p) / p;
    return a;
}
function copyToClipboard(string) {
    let textarea;
    let result;
    try {
        textarea = document.createElement('textarea');
        textarea.setAttribute('readonly', true);
        textarea.setAttribute('contenteditable', true);
        textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
        textarea.value = string;

        document.body.appendChild(textarea);

        //textarea.focus();
        textarea.select();

        const range = document.createRange();
        range.selectNodeContents(textarea);

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        textarea.setSelectionRange(0, textarea.value.length);
        result = document.execCommand('copy');
    } catch (err) {
        console.error(err);
        result = null;
    } finally {
        document.body.removeChild(textarea);
    }

    // manual copy fallback using prompt
    if (!result) {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
        result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
        if (!result) {
            return false;
        }
    }
    return true;
}
/*-------------------------------*/
function getLocation(type, id) {
    $.ajax({
        url: '/account/GetLocation',
        data: {
            type: type,
            id: id
        },
        type: 'POST',
        success: function (data) {
            var html = '<option value="">Please select</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>'
            }
            if (type == 'district') {
                $('[name="txtDistrict"]').html(html);
            } else if (type == 'commune') {
                $('[name="txtCommune"]').html(html);
            }
        }
    });
}
function changeDeliveryMethod(val) {
    $.ajax({
        url: '/cart/changeDeliveryMethod',
        type: 'POST',
        data: {
            type: val
        },
        success: function (data) {
            if (data.check) {
                toast('success', data.ms);
                window.location.reload();
            } else {
                toast('error', data.ms);
            }
        }
    })
}
'use strict';
(function ($) {
    if ($('form .number').length) {
        autoFormatNumber();
    }
    // Preloader
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });
    $(document).on('click', '.copy', function () {
        var text = $(this).attr('text');
        copyToClipboard(text);
        toast('success', 'Đã sao chép');
    });
    // Gallery filter
    $(document).on('click', '.featured__controls li', function () {
        $('.featured__controls li').removeClass('active');
        $(this).addClass('active');
    });

    // Background Set
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });
    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    // Navigation
    if ($(".mobile-menu").length) {
        $(".mobile-menu").slicknav({
            prependTo: '#mobile-menu-wrap',
            allowParentLinks: true
        });
    }
    $('.nav-tabs .nav-item').click(function () {
        window.location.hash = $(this).find('a').attr('href');
    });
    if (window.location.hash != null) {
        $('[href="' + window.location.hash + '"]').click();
    }

    
    // onclick show element
    $('.hero__categories__all').on('click', function () {
        $('.hero__categories ul').slideToggle(200);
    });
    $(document).on('click', ".nav-item .nav-link", function () {
        $('.nav-item .nav-link').removeClass('active');
        $(this).addClass('active');
    });    

    // Product Details
    if ($(".product__details__pic__slider").length) {
        $(".product__details__pic__slider").owlCarousel({
            loop: true,
            margin: 20,
            items: 4,
            dots: true,
            smartSpeed: 1200,
            autoHeight: false,
            autoplay: true
        });
    }
    $('.product__details__pic__slider img').on('click', function () {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__details__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__details__pic__item--large').attr({
                src: imgurl
            });
        }
    });
    $(document).on('click', '.quantity-button', function () {
        var input = $(this).parent().find('#quantity');
        var quantity = parseInt(input.val() || "1");
        if ($(this).hasClass("minus")) {
            quantity--;
            if (quantity <= 1)
                quantity = 1;
        } else {
            quantity++;
        }
        input.val(quantity);
        $('#update_cart').prop('disabled', false);
    });

    // Select box
    if ($(".niceSelect").length) {
        $(".niceSelect").niceSelect();
    }

    // Cart
    function loadCart() {
        $.ajax({
            url: '/cart/cart',
            success: function (data) {
                $('.header-cart').html(data);
            }
        });
    }
    $(document).on('click', '.btnAddToCart', function () {
        var button = $(this);
        text = button.html();
        button.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i>');
        $.ajax({
            url: '/cart/addproducttocart',
            type: 'POST',
            data: {
                productId: button.attr('productId'),
                quantity: $('#quantity').val() || 1
            },
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    loadCart();
                } else {
                    toast('error', data.ms);
                }
                button.prop('disabled', false).html(text);
            },
            error: function (err) {
                toast('error', err.statusText);
                button.prop('disabled', false).text(text);
            }
        });
    });
    $(document).on('submit', '#formUpdateCart', function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('Updating...');
        $.ajax({
            url: '/cart/updatecart',
            type: 'POST',
            data: new FormData(this),
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                }
            },
            error: function (err) {
                toast('error', err.statusText);
                button.prop('disabled', false).text(text);
            }
        });
    });
    $(document).on('click', '.btnAddToFavorite', function () {
        var button = $(this);
        text = button.html();
        var productId = button.attr('productId');
        button.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i>');
        $.ajax({
            url: '/product/AddToFavorite',
            type:'POST',
            data: {
                productId: productId
            },
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    if (data.type) {
                        button.addClass('active');
                    } else {
                        button.removeClass('active');
                    }
                } else {
                    toast('error', data.ms);
                }
                button.prop('disabled', false).html(text);
            }
        });
    });
    $(document).on('change', '.selectLocation', function () {
        var type = $(this).attr('type');
        var id = $(this).val();
        getLocation(type, id);
    });
    $(document).on('change', '#formCheckout [name="txtPaymentMethod"]', function () {
        var val = $(this).val();
        if (val == 1) {
            $('.PayRequired').hide();
        } else {
            $('.PayRequired').show();
        }
    });
    $(document).on('submit', '#formCheckout', function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('Ordering...');
        var form = new FormData(this);
        $.ajax({
            url: '/cart/FormCheckout',
            type: 'POST',
            data: form,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    direct('/account/invoice');
                } else {
                    toast('error', data.ms);
                    button.prop('disabled', false).text(text);
                }
            },
            error: function (err) {
                toast('error', err.statusText);
                button.prop('disabled', false).text(text);
            }
        });

    });
    $(document).on('click', '.remove_from_cart_button', function () {
        $.ajax({
            url: '/cart/removeproductfromcart',
            type: 'POST',
            data: {
                productId: $(this).attr('productId')
            },
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    if ($('.cart-wrapper').length) {
                        reload();
                    } else {
                        loadCart();
                    }
                } else {
                    toast('error', data.ms);
                }
            },
            error: function (err) {
                toast('error', err.statusText);
            }
        });
    });
    $(document).on('click', '.btnCancelOrder', function () {
        var cf = confirm('Order cancellation confirmation');
        if (cf) {
            var button = $(this);
            var text = button.text();
            button.prop('disabled', true).text('Canceling order...');
            $.ajax({
                url: '/account/cancelorder',
                type:'POST',
                data: {
                    id: button.attr('id')
                },
                success: function (data) {
                    if (data.check) {
                        toast('success', data.ms);
                        direct("/account/invoice");
                    } else {
                        toast('error', data.ms);
                        button.prop('disabled', false).text(text);
                    }
                }
            });
        }
    });

    // User
    $(document).on('submit', "#formRegister", function (e) {
        e.preventDefault();
        var button = $(this).find('button');
        var text = button.html();
        button.prop('disabled', true).html('Signing up');
        $.ajax({
            url: "/Account/Register",
            type: "POST",
            contentType: false,
            cache: false,
            processData: false,
            data: new FormData(this),
            success: function (data) {
                if (data.check == false) {
                    toast('error', data.ms);
                    button.html(text).prop('disabled', false);
                } else {
                    toast('success', data.ms);
                    setTimeout(function () {
                        window.location.href = "/account/login";
                    }, 1000);
                }
            },
            error: function (ex) {
                toast('error', ex.statusText);
                button.html(text).prop('disabled', false);
            }
        })
    });
    $(document).on('submit', "#formLogin", function (e) {
        e.preventDefault();
        var THIS = $(this);
        var button = THIS.find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('Logging in');
        var formData = new FormData(this);
        $.ajax({
            data: formData,
            url: '/account/login?returnUrl=' + $('#returnUrl').val(),
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.check == true) {
                    toast('success', data.ms);
                    if (data.returnUrl) {
                        direct(data.returnUrl);
                    }
                    else {
                        reload();
                    }
                } else {
                    toast('error', data.ms);
                    button.prop('disabled', false).text(text);
                }
            },
            error: function (err) {
                toast('error', err.ms);
                button.prop('disabled', false).text(text);
            }
        });
    });
    $(document).on('submit', "#formForgotPassword", function (e) {
        e.preventDefault();
        var THIS = $(this);
        var button = THIS.find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('Please wait');
        var formData = new FormData(this);
        $.ajax({
            data: formData,
            url: '/account/FormForgotPassword',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.check == true) {
                    toast('success', data.ms);
                    direct('/account/login');
                } else {
                    toast('error', data.ms);
                }
                button.prop('disabled', false).text(text);
            },
            error: function (err) {
                toast('error', err.statusText);
                button.prop('disabled', false).text(text);
            }
        });
    });
    $(document).on('submit', '#formResetPassword', function (e) {
        e.preventDefault();
        var button = $(this).find('button');
        var text = button.html();
        button.prop('disabled', true).html('Loading...');
        $.ajax({
            url: "/account/FormResetPassword",
            type: "POST",
            contentType: false,
            cache: false,
            processData: false,
            data: new FormData(this),
            success: function (data) {
                if (data.check == false) {
                    button.html(text).prop('disabled', false);
                    toast('error', data.ms);
                } else {
                    toast('success', data.ms);
                    direct("/account/login");
                }
            },
            error: function (ex) {
                toast('error', ex.statusText);
            }
        })
    });
    $(document).on('submit', "#formAddAddress", function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('Loading...');
        $.ajax({
            url: '/account/formAddAddress',
            data: new FormData(this),
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                    button.prop('disabled', false).text(text);
                }
            }
        });
    });
    $(document).on('change', '#changeAddress [name="changeAddress"]', function () {
        var check = $(this).is(':checked');
        if (check) {
            $.ajax({
                url: '/account/SetDefaultAddress',
                data: {
                    id: $(this).attr('id')
                },
                type: 'POST',
                success: function (data) {
                    if (data.check) {
                        toast('success', data.ms);
                        reload();
                    }
                }
            });
        }
    });
    $(document).on('click', '.btnActiveUser', function () {
        var cf = confirm('Activation confirmation, no refund after activation');
        if (cf) {
            var button = $(this);
            var text = button.text();
            button.prop('disabled', true).text('Activating');
            $.ajax({
                url: '/account/formActiveUser',
                type: 'POST',
                data: {
                    id: button.attr('id')
                },
                success: function (data) {
                    if (data.check) {
                        toast('success', data.ms);
                        direct("/account/home");
                    } else {
                        toast('error', data.ms);
                        button.prop('disabled', false).text(text);
                    }
                }
            });
        }
    });
    $(document).on('submit', '#FormVerifyUser', function (e) {
        e.preventDefault();
        var THIS = $(this);
        var button = THIS.find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('processing');
        var formData = new FormData(this);
        formData.append('IssuedOn', $('.IssuedOnYear').val() + "-" + $('.IssuedOnMonth').val() + "-" + $('.IssuedOnDay').val());
        formData.append('BirthDay', $('.BirthDayYear').val() + "-" + $('.BirthDayMonth').val() + "-" + $('.BirthDayDay').val());
        $.ajax({
            data: formData,
            url: '/account/FormVerifyUser',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.check == true) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                    button.prop('disabled', false).text(text);
                }
            },
            error: function (err) {
                toast('error', err.statusText);
                button.prop('disabled', false).text(text);
            }
        });
    });
    $(document).on('submit', '#editUserProfile', function (e) {
        e.preventDefault();
        var THIS = $(this);
        var button = THIS.find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text("processing");
        var formData = new FormData(this);
        $.ajax({
            data: formData,
            url: '/account/FormUpdateInfoUser',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.check == true) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                    button.prop('disabled', false).text(text);
                }
            },
            error: function (err) {
                toast('error', err.statusText);
                button.prop('disabled', false).text(text);
            }
        });
    });
    $("#formCreatePasswordTwoLevel").submit(function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('processing');
        $.ajax({
            url: '/account/EnablePassword2',
            data: new FormData(this),
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                }
                button.prop('disabled', false).text(text);
            }
        });
    });
    $("#formChangePasswordTwoLevel").submit(function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('processing');
        $.ajax({
            url: '/account/ChangePassword2',
            data: new FormData(this),
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                }
                button.prop('disabled', false).text(text);
            }
        });
    });
    $("#formChangePassword").submit(function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('processing');
        $.ajax({
            url: '/account/FormChangePass',
            data: new FormData(this),
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                }
                button.prop('disabled', false).text(text);
            }
        });
    });
    $("#changeSecurityPin").submit(function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('processing');
        $.ajax({
            url: '/account/ChangeSecurityPin',
            data: new FormData(this),
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                }
                button.prop('disabled', false).text(text);
            },
            error: function (err) {
                toast('error', err.statusText);
                button.prop('disabled', false).text(text);

            }
        });
    });


    // wallet
    $('#formTransfer').submit(function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('Processing');
        $.ajax({
            url: '/wallet/FormTransfer',
            data: new FormData(this),
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                    button.prop('disabled', false).text(text);
                }
            },
            error: function (err) {
                toast('error', err.statusText);
                button.prop('disabled', false).text(text);
            }
        });
    });
    $('#formWithdraw [name="txtBank"]').change(function () {
        var option = $(this).find('option:selected');
        $('#formWithdraw [name="txtBankBranch"]').val(option.attr('bankBranch'));
        $('#formWithdraw [name="txtBankHolder"]').val(option.attr('bankHolder'));
        $('#formWithdraw [name="txtBankNumber"]').val(option.attr('bankNumber'));
    });
    $('#formWithdraw').submit(function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('Processing');
        $.ajax({
            url: '/wallet/formwithdraw',
            type: 'POST',
            data: new FormData(this),
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                    button.prop('disabled', false).text(text);
                }
            },
            error: function (err) {
                toast('error', err.statusText);
                button.prop('disabled', false).text(text);
            }
        });
    });

    // My Bank
    $(document).on('submit', '#formAddBank', function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('Processing');
        $.ajax({
            url: '/account/formaddbank',
            type: 'POST',
            data: new FormData(this),
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    if (ref = 'withdraw') {
                        window.location.href = '/wallet/asset/0#menu3'
                    } else {
                        reload();
                    }
                } else {
                    toast('error', data.ms);
                    button.prop('disabled', false).text(text);
                }
            },
            error: function (err) {
                toast('error', err.statusText);
                button.prop('disabled', false).text(text);
            }
        });
    });
    $(document).on('click', '.deleteBank', function () {
        var id = $(this).attr('id');
        var cf = confirm('Confirm delete');
        if (cf) {
            $.ajax({
                url: '/account/deletebank',
                type: 'POST',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.check) {
                        toast('success', data.ms);
                        reload();
                    } else {
                        toast('error', data.ms);
                    }
                }
            });
        }
    });

    // store
    $(document).on('click', '.btnSelectAll', function () {
        var input = $(this).find('input');
        input.prop('checked', !input.is(':checked'));
        $('.selectMultiProduct').prop('checked', input.is(':checked'));
        $('.selectMultiRemoveProduct').prop('checked', input.is(':checked'));
    });
    $(document).on('click', '.removeProduct', function () {
        var cf = confirm('Confirm removal');
        if (cf) {
            removeProductSelectedFromShop($(this).attr('productId'));
        }
    });
    function formAddProductToShop(productId, categoryId, button) {
        var form = new FormData();
        form.append('txtProductId', productId);
        form.append('txtCategoryId', categoryId);
        form.append('autoSelectCate', $('#autoSelectCate').is(':checked'));
        $.ajax({
            url: '/shop/formAddProductToShop',
            data: form,
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    totalAddProduct++;
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                    button.prop('disabled', false).text('Add selected products');
                }
            },
            error: function (err) {
                toast('error', err.responseText);
            }
        });
    }
    function removeProductSelectedFromShop(productId) {
        $.ajax({
            url: '/shop/removeProduct',
            data: {
                productId: productId
            },
            type: 'POST',
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                }
                totalAddProduct++;
            }
        });
    }
    $(document).on('click', '.btnAddProductToShop', function () {
        $('#formAddProductToShop [name="txtProductId"]').val($(this).attr('productId'));
        $('#formAddProductToShop').attr('multi', "0");
        $('#formAddProductToShop').modal('show');
    });
    $(document).on('click', '.btnAddProductSelectedToShop', function () {
        $('#formAddProductToShop').attr('multi', "1");
        $('#formAddProductToShop').modal('show');
    });
    $(document).on('submit', '#formAddProductToShop', function (e) {
        e.preventDefault();
        totalAddProduct = 0;
        var button = $('.btnAddProductSelectedToShop');
        var multi = $('#formAddProductToShop').attr('multi');
        var productId = $(this).find('[name="txtProductId"]').val();
        var categoryId = $(this).find('[name="txtCategoryId"]').val();
        if (multi == "1") {
            if ($('.selectMultiProduct:checked').length) {
                button.prop('disabled', true).text('Adding...');
                var listProductId = '';
                $('.selectMultiProduct:checked').each(function () {
                    listProductId += $(this).attr('productId') + ",";
                });
                if (listProductId) {
                    formAddProductToShop(listProductId, categoryId, button);
                }
            }
        } else {
            button.prop('disabled', true).text('Adding...');
            formAddProductToShop(productId, categoryId, button)
        }
        $('#formAddProductToShop').modal('hide');
    });
    $(document).on('click', '.btnRemoveProductSelectedToShop', function () {
        var cf = confirm('Confirm removal');
        if (cf) {
            if ($('.selectMultiRemoveProduct:checked').length) {
                $(this).prop('disabled', true).text('Removing...');
                var listId = '';
                $('.selectMultiRemoveProduct:checked').each(function () {
                    listId += $(this).attr('productId') + ",";
                });
                if (listId) {
                    removeProductSelectedFromShop(listId);
                }
            }
        }
    });
    // my product
    $(document).on('click', '.btnSelectAllMyProduct', function () {
        var input = $(this).find('input');
        input.prop('checked', !input.is(':checked'));
        $('.selectMultiProduct').prop('checked', input.is(':checked'));
    });
    $(document).on('click', '.btnRemoveProductSelected', function () {
        var cf = confirm('Confirm action');
        if (cf) {
            var text = $(this).text();
            if ($('.selectMultiProduct:checked').length) {
                $(this).prop('disabled', true).text('Processing...');
                var listId = '';
                $('.selectMultiProduct:checked').each(function () {
                    listId += $(this).attr('productId') + ",";
                });
                if (listId) {
                    removeProductSelectedFromShop(listId);
                }
                $(this).prop('disabled', false).text(text);
            }
        }
    });
    $("#formUpdateShopName").submit(function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('processing');
        $.ajax({
            url: '/shop/UpdateShopName',
            data: new FormData(this),
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                }
                button.prop('disabled', false).text(text);
            }
        });
    });
    $("#formUpdateShopAvatar").submit(function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('processing');
        $.ajax({
            url: '/shop/formUpdateShopAvatar',
            data: new FormData(this),
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                }
                button.prop('disabled', false).text(text);
            }
        });
    });
    // Setting
    $("#formUpdateDomain").submit(function (e) {
        e.preventDefault();
        var button = $(this).find('[type="submit"]');
        var text = button.text();
        button.prop('disabled', true).text('processing');
        $.ajax({
            url: '/wpq/updatedomain',
            data: new FormData(this),
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.check) {
                    toast('success', data.ms);
                    reload();
                } else {
                    toast('error', data.ms);
                }
                button.prop('disabled', false).text(text);
            }
        });
    });

})(jQuery);
