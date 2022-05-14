const baseUrl = "http://localhost:3000/";
const getToDoList = document.querySelector("#toDoList ul");
const getSubmitBtn = document.querySelector("input[type='submit']");
// postData function
async function postData() {
  getToDoList.innerHTML = "";
  let textEnteredByUser = document.querySelector("#fname").value;
  //   console.log(textEnteredByUser);

  const results = `description: ${textEnteredByUser}`;
  const data = { description: results, done: false };
  if (textEnteredByUser) {
    fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    // alert("please Enter a text");
    const getError = document.querySelector("#error");
    getError.innerHTML = "Please enter a text";
  }
  try {
    const response = data;

    const createLi = document.createElement("li");

    getToDoList.appendChild.createLi;
    createLi.appendChild.response;
    console.log(response);

    getData();
  } catch (err) {
    console.log(err);
  }
}
// getData function with GET mathod
async function getData() {
  try {
    const res = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();
    const getToDoList = document.querySelector("#toDoList ul");

    const resultMap = response.map((des) => des.description);
    const resultMapDone = response.map((des) => des.done);
    const resultMapId = response.map((des) => des._id);
    // for loop for all the above variables
    for (i = 0; i < resultMap.length; i++) {
      //   console.log(resultMapId[i]);
      const isDone = resultMapDone[i];
      getToDoList.innerHTML += `<li> <input name=checkbox type="checkbox" id="doneBox${[
        i,
      ]}" name="done">
      <span> ${
        resultMap[i]
      } </span> <span1> Done: ${isDone}</span1> <span2 id=btnEdit${[
        i,
      ]}>  <span class="the-trick"> </span2> <button id="button${[i]}" value="${
        resultMapId[i]
      }"> Delete</button> </li>`;
    }

    const getSpan = document.querySelectorAll("span1");
    const getSpan2 = document.querySelectorAll("span2");
    //  // add classlist
    // console.log(getSpan2);
    // getSpan2.forEach((span2) => {
    //   //   span2.classList.add("bg");
    // });
    editButton(getSpan2);
    // change style with javascript

    // getSpan.forEach((span) => {
    //   let styles = span.style;
    //   styles.margin = "10px 30px";
    //   //   styles.display = "inline";
    //   //   styles.justifyContent = "space-evenly";
    //   //   styles.alignContent = "center";
    // });
    console.log(getSpan);
    // console.log(getSpan2);
    firstFunc();
    // check if done is ture and apply line-through
    for (i = 0; i < resultMapDone.length; i++) {
      if (resultMapDone[i] === true) {
        // el.parentNode.classList.toggle("lineThrough");
        console.log(resultMapDone[i]);
        console.log(getToDoList.children[i]);
        getToDoList.children[i].classList.add("lineThrough");
        const checkBox = document.querySelectorAll("input[name=checkbox]");
        checkBox[i].checked = true;
      }
    }
    // add classlist to box when checked
    function firstFunc() {
      const deleteText = document.querySelectorAll("button");
      const checkBox = document.querySelectorAll("input[name=checkbox]");
      checkBox.forEach((box) => {
        box.addEventListener("change", function () {
          const getId = box.parentNode.children[4].value;

          if (this.checked) {
            console.log("Checkbox is checked.." + box.id);
            //   box.parentNode.style.color = "blue";
            //   box.parentNode.style.textDecoration = "line-through";
            // console.log(box.parentNode.children[2]);
            box.parentNode.classList.add("lineThrough");
            // const lineThroughs = box.parentNode;
            // console.log(lineThroughs);

            updateThis(getId, true, box);
          } else {
            console.log("Checkbox is not checked.." + box.id);
            //   box.parentNode.style.color = "black";
            //   box.parentNode.style.textDecoration = "none";
            box.parentNode.classList.toggle("lineThrough");

            updateThis(getId, false, box);
          }
        });
      });

      deleteCheckBox(deleteText);
    }
  } catch (err) {
    console.log(err);
  }
}

getData();
// deleteCheckBox
async function deleteCheckBox(getDeleteText) {
  getDeleteText.forEach((btn) => {
    const func1 = () => {
      console.log(btn);
      removeThisWithJava(btn);
      deleteFromDataB(btn.value);
    };

    btn.addEventListener("click", func1);
  });
}
async function deleteFromDataB(btnValue) {
  //   console.log(btnValue);
  fetch(baseUrl + btnValue, {
    method: "DELETE",
    // body: JSON.stringify(data),
  });
}
// removeThisWithJava
const removeThisWithJava = (e) => {
  console.log(e.id);
  e.parentNode.remove();
};
getSubmitBtn.addEventListener("click", function (e) {
  //   console.log(e.target);
  postData();
});

const getCheckBoxes = (getBoxs) => {
  getBoxs.forEach((box) => {
    const func1 = () => {
      console.log(box.id);
      removeThisWithJava(box);
      deleteFromDataB(box.id);
    };
    box.addEventListener("checked", func1);
  });
};
// update done true/false
const updateThis = (mapDone, trueOrFalse, box) => {
  fetch(baseUrl + mapDone, {
    method: "PUT",
    body: JSON.stringify({ done: trueOrFalse }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(trueOrFalse);
  let getSpan = box.parentNode.querySelector("span1");

  if (trueOrFalse) {
    getSpan.innerHTML = "Done: true";
  } else if (!trueOrFalse) {
    getSpan.innerHTML = "Done: false";
  }
  console.log();
};
// edit button is the plus icon
const editButton = (getSpan2) => {
  //   console.log(getSpan2);
  getSpan2.forEach((span2) => {
    span2.addEventListener("click", function () {
      console.log(span2);
      const getId = span2.parentNode.children[4].value;
      //   console.log(getId);

      span2.parentNode.innerHTML = `Edit <input class="editedText" type=text value ="" /> <button class="confirme" name='lineThrough' > confirme</button>`;
      let textEditedByUser = document.querySelector(".editedText");
      let getBtns = document.querySelector(".confirme");
      //   console.log(getBtns);
      getBtns.addEventListener("click", () => {
        console.log(getBtns);
        const r = (getBtns.value = textEditedByUser.value);
        if (r) {
          updateThisData(r, getId);
        } else {
          postData();
        }
      });
    });
  });
};
// update description
const updateThisData = (textEditedByUser, getId) => {
  let textEnteredByUser = document.querySelector("#fname").value;
  let resul = (textEnteredByUser.innerHTML = textEditedByUser);
  fetch(baseUrl + getId, {
    method: "PUT",
    body: JSON.stringify({ description: "description: " + resul }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getToDoList.innerHTML = "";
  getData();
};
