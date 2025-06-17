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
  var validResult = isValidURL(siteUrl.value);
  URL.Url = validResult.url;

  if (validResult.isValid) {
    bookmarksArr.push(URL);
    localStorage.setItem("URL", JSON.stringify(bookmarksArr));
    displayURL();
    clearInputs();
  } else {
    showAlert();
  }
}

function displayURL() {
  var cartona = "";
  for (let i = 0; i < bookmarksArr.length; i++) {
    cartona += `
             <tr>
                <td>${i}</td>
                <td>${bookmarksArr[i].name}</td>           
                <td>
                  <button class="btn btn-visit" onclick="openURL(${i})"><i class="fa-solid fa-eye pe-2"></i> Visit</button>
                </td>
                <td>
                  <button class="btn btn-delete " onclick="deleteURL(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
                </td>
             </tr>
`;
  }
  document.getElementById("tBody").innerHTML = cartona;
  // console.log(cartona);
  //console.log(productsArr);
}

function deleteURL(index) {
  bookmarksArr.splice(index, 1);
  displayURL();
  localStorage.setItem("URL", JSON.stringify(bookmarksArr));
}

function openURL(index) {
  var url = bookmarksArr[index].Url;
  if (url) {
    window.open(url, "_blank"); // Opens in a new tab
  } else {
    console.error("URL not found at index", index);
  }
}

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
}

function isValidURL(url) {
  if (!/^https?:\/\//i.test(url)) {
    if (/^www\./i.test(url)) {
      url = `https://${url}`;
    } else {
      url = `https://www.${url}`;
    }
  }
//   if (/^[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,5}$/.test(url)) {
//     url = `https://www.${url}`;
//   } else if (/^(www\.)[a-zA-Z0-9-]{3,}\.[a-zA-Z]{2,5}$/.test(url)) {
//     url = `https://${url}`;
//   }else if(/^(https:\/\/)(?!www\.).*[a-zA-Z0-9-]{3,}\.[a-zA-Z]{2,5}$/.test(url)){
// url = `https://www.${url.slice(8)}`;
//   }else if(/^(http:\/\/)(?!www\.).*[a-zA-Z0-9-]{3,}\.[a-zA-Z]{2,5}$/.test(url)){
// url = `https://www.${url.slice(7)}`;
//   }
  var pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{3,}\.[a-zA-Z]{2,5}$/;
  var isValid = pattern.test(url);
console.log(url)
  return { isValid, 
      url };
}

function showAlert() {
  Swal.fire({
    icon: "error",
    title: "Site Name or URL is not valid",
    html: `
      <p class="text-danger-emphasis fw-bold fs-4 py-2">Please follow the rules below:</p>
      <p class="text-bg-danger text-start">➤ Site name must contain at least 3 characters</p>
     <p class="text-bg-danger text-start">➤ Site URL must be a valid one</p>
      
    `,
  });
}
