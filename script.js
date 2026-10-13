const products = [
    {
        id: 1,
        name: "Chocolate Cake",
        price: 85000,
        category: "cake",
        icon: "🍫",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85",
        desc: "Cake cokelat lembut dengan cokelat asli.",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Strawberry Cake",
        price: 25000,
        category: "cake",
        icon: "🍓",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85",
        desc: "Cake strawberry dengan krim segar.",
        badge: "Favorit"
    },
    {
        id: 3,
        name: "Red Velvet Cake",
        price: 25000,
        category: "cake",
        icon: "❤️",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=700&q=85",
        desc: "Red velvet lembut dengan cream cheese.",
        badge: "Best Seller"
    },
    {
        id: 4,
        name: "Cheesecake",
        price: 30000,
        category: "cake",
        icon: "🧀",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=85",
        desc: "Cheesecake creamy dengan rasa gurih.",
        badge: "Favorit"
    },
    {
        id: 14,
        name: "Blueberry Cake",
        price: 25000,
        category: "cake",
        icon: "🫐",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=700&q=85",
        desc: "Cake lembut dengan blueberry dan krim manis.",
        badge: "Baru"
    },

    {
        id: 5,
        name: "Vanilla Cupcake",
        price: 20000,
        category: "cupcake",
        icon: "🧁",
        image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=700&q=85",
        desc: "Cupcake vanilla dengan frosting lembut.",
        badge: ""
    },
    {
        id: 6,
        name: "Chocolate Cupcake",
        price: 22000,
        category: "cupcake",
        icon: "🍫",
        image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=700&q=85",
        desc: "Cupcake cokelat dengan frosting rich.",
        badge: "Baru"
    },
    {
        id: 9,
        name: "Cerry Cupcake",
        price: 23000,
        category: "cupcake",
        icon: "🍪",
        image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=700&q=85",
        desc: "Cupcake dengan topping cream berry.",
        badge: ""
    },
    {
        id: 18,
        name: "Strawberry Cupcake",
        price: 23000,
        category: "cupcake",
        icon: "🍓",
        image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&w=700&q=85",
        desc: "Cupcake strawberry dengan frosting lembut.",
        badge: ""
    },

    {
        id: 10,
        name: "Cookies & Cream",
        price: 28000,
        category: "dessert",
        icon: "🍪",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=85",
        desc: "Dessert creamy dengan cookies dan cream.",
        badge: ""
    },
    {
        id: 11,
        name: "Tiramisu",
        price: 30000,
        category: "dessert",
        icon: "☕",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=85",
        desc: "Tiramisu lembut dengan rasa kopi dan mascarpone.",
        badge: "Favorit"
    },
    {
        id: 20,
        name: "Salad Buah",
        price: 35000,
        category: "dessert",
        icon: "🥭",
        image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=85",
        desc: "Rasa buah yang segar dan manis.",
        badge: "Baru"
    },
    {
        id: 21,
        name: "Strawberry Mousse",
        price: 25000,
        category: "dessert",
        icon: "🍓",
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=85",
        desc: "Mousse strawberry lembut dengan rasa strawberry yang kaya.",
        badge: "Favorit"
    },
    {
        id: 22,
        name: "Strawberry Parfait",
        price: 28000,
        category: "dessert",
        icon: "🍓",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=85",
        desc: "Dessert strawberry dengan cream dan topping segar.",
        badge: ""
    }
];

let cart = [];

const $ = id => document.getElementById(id);

const rupiah = n =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(n);

/* TAMPILKAN  PRODUK */
function tampilkanProduk(category = "all") {

    const grid = $("productGrid");

    const data = category === "all"
        ? products
        : products.filter(p => p.category === category);

    grid.innerHTML = data.map(p => `
        <div class="product-card">

            <div class="product-image">

                <img
                    src="${p.image}"
                    alt="${p.name}"
                    onerror="this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85'"
                >

                ${p.badge
                    ? `<span class="badge">${p.badge}</span>`
                    : ""
                }

            </div>

            <div class="product-info">

                <h3>
                    ${p.icon} ${p.name}
                </h3>

                <p class="product-desc">
                    ${p.desc}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        ${rupiah(p.price)}
                    </span>

                    <button
                        class="add-btn"
                        onclick="tambahKeranjang(${p.id})"
                    >
                        +
                    </button>

                </div>

            </div>

        </div>
    `).join("");
}

/* FILTER */
document.querySelectorAll(".filter-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        document
            .querySelectorAll(".filter-btn")
            .forEach(b => b.classList.remove("active"));

        this.classList.add("active");

        tampilkanProduk(this.dataset.category);
    });

});

/* TAMBAH KERANJANG */
function tambahKeranjang(id) {

    const product = products.find(p => p.id === id);
    const existing = cart.find(p => p.id === id);

    existing
        ? existing.qty++
        : cart.push({ ...product, qty: 1 });

    updateCart();

    tampilkanToast(
        `${product.name} ditambahkan ke keranjang 🧁`
    );
}

/* UPDATE KERANJANG */
function updateCart() {

    let jumlahItem = 0;
    let subtotal = 0;

    cart.forEach(p => {
        jumlahItem += p.qty;
        subtotal += p.price * p.qty;
    });

    /* SOAL 1 - DISKON 10% */
    const diskon =
        subtotal > 100000
            ? subtotal * .1
            : 0;

    const total = subtotal - diskon;

    $("cartCount").textContent = jumlahItem;
    $("subtotal").textContent = rupiah(subtotal);
    $("discount").textContent = rupiah(diskon);
    $("total").textContent = rupiah(total);

    if (!cart.length) {

        $("cartItems").innerHTML = `
            <div class="empty-cart">
                Keranjang masih kosong 🍰
            </div>
        `;

        return;
    }

    $("cartItems").innerHTML = cart.map(p => `

        <div class="cart-item">

            <img
                class="cart-item-image"
                src="${p.image}"
                alt="${p.name}"
                onerror="this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80'"
            >

            <div class="cart-item-info">

                <h4>${p.name}</h4>

                <div class="cart-item-price">
                    ${rupiah(p.price)}
                </div>

                <div class="quantity">

                    <button onclick="ubahJumlah(${p.id},-1)">
                        -
                    </button>

                    <span>${p.qty}</span>

                    <button onclick="ubahJumlah(${p.id},1)">
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="hapusDariKeranjang(${p.id})"
                    >
                        Hapus
                    </button>

                </div>

            </div>

        </div>

    `).join("");
}

/* UBAH JUMLAH */
function ubahJumlah(id, perubahan) {

    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.qty += perubahan;

    if (item.qty <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    updateCart();
}

/* HAPUS PRODUK */
function hapusDariKeranjang(id) {

    cart = cart.filter(p => p.id !== id);

    updateCart();
}

/* BUKA KERANJANG */
function bukaKeranjang() {

    $("cartSidebar").classList.add("active");
    $("overlay").classList.add("active");
}

/* TUTUP KERANJANG */
function tutupKeranjang() {

    $("cartSidebar").classList.remove("active");
    $("overlay").classList.remove("active");
}

function tutupSemua() {
    tutupKeranjang();
}

function scrollKeProduk() {
    $("produk").scrollIntoView({
        behavior: "smooth"
    });
}

/* CHECKOUT */
function mulaiCheckout() {

    if (!cart.length) {
        return tampilkanToast("Keranjang masih kosong!");
    }
    $("buyerModal").classList.add("active");
}

function tutupBuyerModal() {
    $("buyerModal").classList.remove("active");
}

/* SOAL 2 - SIMPAN RIWAYAT */
function simpanRiwayat(
    nama,
    alamat,
    noHp,
    subtotal,
    diskon,
    total,
    jumlahItem
) {

    const riwayat =
        JSON.parse(
            localStorage.getItem("riwayatTransaksi")
        ) || [];

    riwayat.push({
        tanggal: new Date().toLocaleString("id-ID"),
        nama,
        alamat,
        noHp,
        jumlahItem,
        subtotal,
        diskon,
        total
    });

    localStorage.setItem(
        "riwayatTransaksi",
        JSON.stringify(riwayat)
    );
}

/* FORM PEMBELI */
$("buyerForm").addEventListener("submit", e => {

    e.preventDefault();

    const nama = $("nama").value.trim();
    const alamat = $("alamat").value.trim();
    const noHp = $("noHp").value.trim();

    if (!nama || !alamat || !noHp) {
        return tampilkanToast("Semua data harus diisi!");
    }

    let subtotal = 0;
    let jumlahItem = 0;

    cart.forEach(p => {
        subtotal += p.price * p.qty;
        jumlahItem += p.qty;
    });

    const diskon =
        subtotal > 100000
            ? subtotal * .1
            : 0;

    const total = subtotal - diskon;

    simpanRiwayat(
        nama,
        alamat,
        noHp,
        subtotal,
        diskon,
        total,
        jumlahItem
    );

    alert(
        `Pesanan berhasil dibuat!

Nama: ${nama}
Total: ${rupiah(total)}

Terima kasih sudah berbelanja di Sweet Crumb 🍰`
    );

    cart = [];
    updateCart();
    $("buyerForm").reset();
    tutupBuyerModal();
    tutupKeranjang();
});

/* BUKA RIWAYAT */
function bukaRiwayat() {
    tampilkanRiwayat();
    $("historyModal").classList.add("active");
}

/* TUTUP RIWAYAT */
function tutupRiwayat() {
    $("historyModal").classList.remove("active");
}

/* TAMPILKAN RIWAYAT */
function tampilkanRiwayat() {
    const list = $("historyList");
    const riwayat =
        JSON.parse(
            localStorage.getItem("riwayatTransaksi")
        ) || [];

    if (!riwayat.length) {
        list.innerHTML = `
            <div class="no-history">
                Belum ada riwayat transaksi 🍰
            </div>
        `;
        return;
    }

    list.innerHTML =
        [...riwayat]
            .reverse()
            .map(t => `

                <div class="history-item">

                    <div class="history-date">
                        📅 ${t.tanggal}
                    </div>

                    <h4>
                        👤 ${t.nama}
                    </h4>

                    <p>📍 ${t.alamat}</p>
                    <p>📱 ${t.noHp}</p>

                    <p>
                        🧁 Jumlah item:
                        ${t.jumlahItem}
                    </p>

                    <p>
                        Subtotal:
                        ${rupiah(t.subtotal)}
                    </p>

                    <p>
                        Diskon:
                        ${rupiah(t.diskon)}
                    </p>

                    <div class="history-total">
                        Total:
                        ${rupiah(t.total)}
                    </div>

                </div>

            `)
            .join("");
}

/* HAPUS RIWAYAT */
function hapusSemuaRiwayat() {
    if (
        !confirm(
            "Yakin ingin menghapus semua riwayat transaksi?"
        )
    ) return;

    localStorage.removeItem(
        "riwayatTransaksi"
    );

    tampilkanRiwayat();

    tampilkanToast(
        "Semua riwayat telah dihapus."
    );
}

/* TOAST */
function tampilkanToast(pesan) {

    const toast = $("toast");

    toast.textContent = pesan;
    toast.classList.add("show");

    setTimeout(
        () => toast.classList.remove("show"),
        2500
    );
}

/* JALANKAN */
tampilkanProduk();
updateCart();