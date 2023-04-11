const api_url = `https://jsonplaceholder.typicode.com/users`;

const usersFilter = document.getElementById('filter');
const search = document.getElementById('search');
const usersTable = document.getElementById('user-table');

// Async Await-----

async function usersData(){
    try {
        const response = await fetch(api_url);
        const data = await response.json()
        
        return data
        
    } catch (error) {
        console.log(error)
    }
}

// ------table rows + data -------
function tableUsers(users) {
    let output = ''
    users.forEach(user => {
        output += 
        `
        <tr>
            <th scope= "row">${user.id}</th>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
            <td>${user.phone}</td>
        </tr>
        `
    })
    usersTable.innerHTML = output;
}

// ------table rows info -------
async function filterUsers() {
    let users = await usersData(api_url);

    let searchText = search.value.toString().toLowerCase();
    // console.log(searchText);
    
    const filterSelection = usersFilter.value;
    let usersFilterList = [];

    switch (filterSelection){
        case "1":
            usersFilterList = users.filter(user => user.id.toString().toLowerCase().includes(searchText));
            break;
        case "2":
            usersFilterList = users.filter(user => user.name.toLowerCase().includes(searchText));
            break;

        case "3":
            usersFilterList = users.filter(user => user.username.toLowerCase().includes(searchText));
            break;
            
        case "4":
            usersFilterList = users.filter(user => user.email.toLowerCase().includes(searchText));
            break;

        case "5":
            usersFilterList = users.filter(user => user.address.city.toLowerCase().includes(searchText));
            break;

        case "6":
            usersFilterList = users.filter(user => user.phone.toLowerCase().includes(searchText));
            break;
        default:
            usersFilterList = users;
    }
    tableUsers(usersFilterList)
}

usersFilter.addEventListener('change', filterUsers);
search.addEventListener('input', filterUsers);

filterUsers()

// ---------name list btn----------------
async function newListNames (){
    let users = await usersData(api_url);
    console.log(users)

    let uList = document.createElement('ul')
    let divList = document.querySelector('.usersNames');
    
    divList.appendChild(uList);
        
    // console.log(li)
    
    users.forEach(user => {
        let li = document.createElement('li');
         
        li.innerHTML =
        `${user.name}
        `      
        uList.appendChild(li);
    })

    return divList 
}

// ---------toggle div---------
function toggleList(){
    newListNames();

    let divList = document.querySelector('.usersNames'); 
    divList.style.display = 'none';
    let btnNames = document.getElementById('btnNames');

    btnNames.addEventListener('click', ()=>{
       if (divList.style.display == 'none'){
           divList.style.display = 'block'    
        } else if (divList.style.display = 'block') {
            divList.style.display = 'none'             
       }
    });
    console.log(btnNames)
    
}
toggleList()
// ---------------------------------------


// ---------string user address---------
async function getAddress() {
    let users = await usersData(api_url);

    let usersAddress = [];

    users.forEach(user => {
        usersAddress.push(JSON.stringify(user.address))
        // return user.address.toString()
    })
    console.log(usersAddress)
    return usersAddress
}
// getAddress()


// ---------sort objects by name---------
async function sortByName() {
    let users = await usersData(api_url);

    let btn = document.getElementById('btnSort');
    
    
    btn.addEventListener('click', sortTable)
    
    
    console.log(btn)

    
    function sortTable() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById('user-table');
        switching = true;
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
          // Start by saying: no switching is done:
          switching = false;
          rows = table.getElementsByTagName("tr");
          /* Loop through all table rows (except the
          first, which contains table headers): */
          for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            // Check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // I so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            } 
          }
          if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        
      }
    }

    function sortTableA() {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById('user-table');

        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
          // Start by saying: no switching is done:
          switching = false;
          rows = table.rows;
          console.log(rows)

          /* Loop through all table rows (except the
          first, which contains table headers): */
          for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD");
            y = rows[i + 1].getElementsByTagName("TD");
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
            } else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
            }
          }
          if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
          } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
          }
        }
      }
}
sortByName();
