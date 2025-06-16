var bookmarksArr = [];
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var mainIndex = 0;

if (localStorage.getItem("URL") != null) {
  bookmarksArr = JSON.parse(localStorage.getItem("URL"));
  displayURL();
}

function addURL() {
  var URL = {
    name: siteName.value,
    Url: siteUrl.value,
  };
  bookmarksArr.push(URL);
  localStorage.setItem("URL", JSON.stringify(bookmarksArr));
  displayURL();
  clearInputs();
}

function displayURL() {
  var cartona = "";
  for (let i = 0; i < bookmarksArr.length; i++) {
    cartona += `
             <tr>
                <td>${i}</td>
                <td>${bookmarksArr[i].name}</td>
                <td>${bookmarksArr[i].Url}</td>
              
                <td>
                  <button class="btn btn-outline-warning" onclick="patchValues(${i})">Visit</button>
                </td>
                <td>
                  <button class="btn btn-outline-danger" onclick="deleteProducts(${i})">Delete</button>
                </td>
             </tr>
`;
  }
  document.getElementById("tBody").innerHTML = cartona;
  // console.log(cartona);
  //console.log(productsArr);
}

localStorage.setItem("userName", "Ahmed");
var userName = localStorage.getItem("userName");
if (userName == null) {
  userName = "Back";
}
document.getElementById("welcome").innerHTML = userName;

function deleteProducts(index) {
  productsArr.splice(index, 1);
  displayProducts();
  localStorage.setItem("Product", JSON.stringify(productsArr));
}

function patchValues(index) {
  mainIndex = index;
  productNameInput.value = productsArr[index].name;
  productPriceInput.value = productsArr[index].price;
  productCategoryInput.value = productsArr[index].category;
  productDescInput.value = productsArr[index].description;
  addUpdateProduct.innerHTML = "Update Product";
}

function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}
