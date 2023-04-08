const api_url = `https://jsonplaceholder.typicode.com/users`;

const usersFilter = document.getElementById('filter');
const search = document.getElementById('search');
const usersTable = document.getElementById('user-table');

// Async Await-----

async function usersData(){
        const response = await fetch(api_url);
        const data = await response.json()
        
        return data
    
}

// ------table rows info -------
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

async function filterUsers() {
    let users = await usersData(api_url);

    let searchText = search.value.toString().toLowerCase();
    console.log(searchText);
    
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

