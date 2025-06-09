const products = [
  { id: 1, name: "Pendiente Suelto Pebbles", category: "Pendientes", image: "assets/images/pendiente_pebbles.jpg", price: 15 },
  { id: 2, name: "Collar Chic", category: "Collares", image: "assets/images/collar_chic.jpg", price: 25 },
  { id: 3, name: "Anillo Ojo de Horus", category: "Anillos", image: "assets/images/anillo_ojo.jpg", price: 18 }
];
const cart = [];

function renderProducts(filter = "Todos") {
  const list = document.getElementById("productList");
  list.innerHTML = "";
  const filtered = filter === "Todos" ? products : products.filter(p => p.category === filter);
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Agregar al carrito</button>`;
    list.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  let total = 0;
  cart.forEach((p, i) => {
    total += p.price;
    const li = document.createElement("li");
    li.textContent = `${p.name} - $${p.price}`;
    list.appendChild(li);
  });
  document.getElementById("totalAmount").textContent = total;
}

function checkout() {
  document.getElementById("invoicePreview").classList.remove("hidden");
  const invoice = document.getElementById("invoiceContent");
  invoice.innerHTML = "<p>Gracias por tu compra. Aquí está tu factura:</p>";
  invoice.innerHTML += "<ul>" + cart.map(p => `<li>${p.name} - $${p.price}</li>`).join("") + "</ul>";
  invoice.innerHTML += `<p>Total: $${cart.reduce((acc, p) => acc + p.price, 0)}</p>`;
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Factura - Joyería AA", 10, 10);
  cart.forEach((p, i) => doc.text(`${p.name} - $${p.price}`, 10, 20 + i * 10));
  doc.text(`Total: $${cart.reduce((acc, p) => acc + p.price, 0)}`, 10, 20 + cart.length * 10);
  doc.save("factura.pdf");
}

document.getElementById("categoryFilter").addEventListener("change", e => {
  renderProducts(e.target.value);
});

renderProducts();
