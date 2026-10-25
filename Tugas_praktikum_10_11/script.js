jQuery.fx.off = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

$(function () {

    // 1. DROPDOWN NAVBAR (mouseenter/mouseleave + slideDown/slideUp) 
    $('.dropdown')
        .on('mouseenter', function () {
            $(this).find('.dropdown-menu').stop(true, true).slideDown(200);
        })
        .on('mouseleave', function () {
            $(this).find('.dropdown-menu').stop(true, true).slideUp(200);
        });

    // Klik tombol Katalog juga membuka menu (untuk layar sentuh / kalau hover tidak pas)
    $('.dropdown > .dropdown-btn').on('click', function () {
        $(this).next('.dropdown-menu').stop(true, true).slideDown(200);
    });

    // Klik di luar dropdown menutup menu
    $(document).on('click', function (e) {
        if ($(e.target).closest('.dropdown').length === 0) {
            $('.dropdown-menu').stop(true, true).slideUp(200);
        }
    });

    //  2. TAB KATALOG (click + fadeIn) 
    $('.tab-panel').hide().first().show();

    function bukaTab(target) {
        $('.tab').removeClass('active');
        $('.tab[data-target="' + target + '"]').addClass('active');
        $('.tab-panel').hide();
        $(target).fadeIn(300);
    }

    $('.tab').on('click', function () {
        bukaTab($(this).data('target'));
    });

    // Klik item dropdown katalog juga membuka tab yang sesuai
    $('.dropdown-menu a').on('click', function () {
        bukaTab($(this).data('tab'));
    });

    //  3. KARTU PRODUK (hover + animate) 
    $('.kartu')
        .on('mouseenter', function () {
            $(this).stop().animate({ top: '-6px' }, 150);
        })
        .on('mouseleave', function () {
            $(this).stop().animate({ top: '0px' }, 150);
        });

    //  4. BACK TO TOP (scroll + fadeIn/fadeOut + animate) 
    const $btnTop = $('#backToTop');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $btnTop.fadeIn(200);
        } else {
            $btnTop.fadeOut(200);
        }
    });

    $btnTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    //  5. SMOOTH SCROLL UNTUK LINK NAVIGASI 
    $('a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href.length < 2) return;

        const $tujuan = $(href);
        if ($tujuan.length === 0) return;

        e.preventDefault();
        $('html, body').animate({ scrollTop: $tujuan.offset().top - 60 }, 500);
    });

    //  TOAST 
    function tampilkanToast(pesan, tipe) {
        $('#toast')
            .stop(true, true)
            .removeClass('success error')
            .addClass(tipe)
            .text(pesan)
            .fadeIn(250)
            .delay(2500)
            .fadeOut(400);
    }

    //  6. KERANJANG 
    let keranjang = [];
    $('.kartu').append('<button class="btn-pesan" type="button">Tambah ke keranjang</button>');

    function tampilKeranjang() {
        let total = 0;
        let jumlah = 0;
        $('#isiKeranjang').empty();
        keranjang.forEach(function (item, i) {
            const subtotal = item.harga * item.qty;
            total += subtotal;
            jumlah += item.qty;
            $('#isiKeranjang').append(
                '<li><span>' + item.nama + ' x' + item.qty + '</span>' +
                '<span>Rp ' + subtotal.toLocaleString('id-ID') +
                ' <button class="hapus" type="button" data-i="' + i + '">&times;</button></span></li>'
            );
        });
        if (keranjang.length === 0) {
            $('#isiKeranjang').append('<li>Keranjang masih kosong</li>');
        }
        $('#jumlahKeranjang').text(jumlah);
        $('#totalHarga').text('Rp ' + total.toLocaleString('id-ID'));
    }

    $('.kartu .btn-pesan').on('click', function () {
        const $kartu = $(this).closest('.kartu');
        const nama = $kartu.find('h3').text();
        const harga = parseInt($kartu.find('.harga').text().replace(/\D/g, ''));
        const sudahAda = keranjang.find(function (item) { return item.nama === nama; });
        if (sudahAda) { sudahAda.qty++; } else { keranjang.push({ nama: nama, harga: harga, qty: 1 }); }
        tampilKeranjang();
        tampilkanToast(nama + ' masuk keranjang', 'success');
    });

    $('#btnKeranjang').on('click', function () {
        $('#panelKeranjang').stop(true, true).slideToggle(250);
    });
    $('#isiKeranjang').on('click', '.hapus', function () {
        keranjang.splice($(this).data('i'), 1);
        tampilKeranjang();
    });

    // pesan sekarang: konfirmasi dulu, lalu keranjang dikosongkan
    $('#pesanSekarang').on('click', function () {
        if (keranjang.length === 0) {
            tampilkanToast('Keranjang masih kosong, pilih produk dulu', 'error');
            return;
        }
        const total = $('#totalHarga').text();
        const jumlah = $('#jumlahKeranjang').text();

        if (confirm('Pesan ' + jumlah + ' item dengan total ' + total + '?')) {
            keranjang = [];
            tampilKeranjang();
            $('#panelKeranjang').slideUp(250);
            tampilkanToast('Pesanan berhasil! Total ' + total, 'success');
        }
    });

    // batalkan: hapus semua isi keranjang
    $('#batalkan').on('click', function () {
        if (keranjang.length === 0) {
            $('#panelKeranjang').slideUp(250);
            return;
        }
        keranjang = [];
        tampilKeranjang();
        $('#panelKeranjang').slideUp(250);
        tampilkanToast('Pesanan dibatalkan', 'error');
    });

    tampilKeranjang();

    // 7. CARI PRODUK (keyup + toggle)
    $('#cari').on('keyup', function () {
        const kata = $(this).val().toLowerCase();
        $('.kartu').each(function () {
            const judul = $(this).find('h3').text().toLowerCase();
            $(this).toggle(judul.includes(kata));
        });
    });

    // 8. VALIDASI FORM (jQuery Validation Plugin)
    // dijalankan paling akhir dan dicek dulu supaya fitur lain tidak ikut mati kalau plugin gagal dimuat
    if (!$.validator) {
        console.error("jQuery Validation Plugin gagal dimuat. Cek koneksi internet / CDN.");
    } else {

        // nomor HP: 10-12 digit angka
        $.validator.addMethod('nomorHp', function (value, element) {
            return this.optional(element) || /^[0-9]{10,12}$/.test(value);
        }, 'Nomor HP harus 10-12 digit angka');

        // password harus kombinasi huruf dan angka
        $.validator.addMethod('hurufAngka', function (value, element) {
            return this.optional(element) || (/[A-Za-z]/.test(value) && /[0-9]/.test(value));
        }, 'Password harus mengandung huruf dan angka');

        // nama hanya boleh huruf dan spasi
        $.validator.addMethod('hurufSaja', function (value, element) {
            return this.optional(element) || /^[A-Za-z\s.']+$/.test(value);
        }, 'Nama hanya boleh berisi huruf');

        const validator = $('#formDaftar').validate({
            rules: {
                nama: { required: true, minlength: 3, hurufSaja: true },
                email: { required: true, email: true },
                hp: { required: true, nomorHp: true },
                kota: { required: true },
                jumlah: { required: true, digits: true, min: 1, max: 20 },
                password: { required: true, minlength: 8, hurufAngka: true },
                konfirmasi: { required: true, equalTo: '#password' },
                setuju: { required: true }
            },
            messages: {
                nama: {
                    required: 'Nama wajib diisi',
                    minlength: 'Nama minimal 3 karakter'
                },
                email: {
                    required: 'Email wajib diisi',
                    email: 'Format email tidak valid'
                },
                hp: { required: 'Nomor HP wajib diisi' },
                kota: { required: 'Pilih kota pengantaran' },
                jumlah: {
                    required: 'Jumlah wajib diisi',
                    digits: 'Jumlah harus berupa angka',
                    min: 'Minimal 1 pesanan',
                    max: 'Maksimal 20 pesanan'
                },
                password: {
                    required: 'Password wajib diisi',
                    minlength: 'Password minimal 8 karakter'
                },
                konfirmasi: {
                    required: 'Konfirmasi password wajib diisi',
                    equalTo: 'Password konfirmasi tidak sama'
                },
                setuju: { required: 'Kamu harus menyetujui syarat dan ketentuan' }
            },
            errorElement: 'div',
            errorClass: 'pesan-error',
            errorPlacement: function (error, element) {
                // pesan error ditaruh di bawah input (untuk checkbox, di bawah labelnya)
                if (element.attr('type') === 'checkbox') {
                    error.appendTo(element.closest('.form-group'));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (el) {
                $(el).addClass('is-error').removeClass('is-valid');
            },
            unhighlight: function (el) {
                $(el).removeClass('is-error').addClass('is-valid');
            },
            submitHandler: function (form) {
                const nama = $('#nama').val().trim();

                tampilkanToast('Selamat datang, ' + nama + '! Kamu sudah terdaftar jadi member.', 'success');
                $('#sukses').stop(true, true).slideDown(300).delay(3000).slideUp(300);

                form.reset();
                validator.resetForm();
                $('#formDaftar input, #formDaftar select').removeClass('is-error is-valid');
            }
        });
    }

});