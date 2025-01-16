// script.js
const API_TOKEN = "acab86802e0d4aa5b2fb3c4c1dc56e8c";
const BASE_URL = "https://api.football-data.org/v4";

async function getGroups() {
  try {
    const response = await axios.get(`${BASE_URL}/competitions/WC/standings`, {
      headers: { "X-Auth-Token": API_TOKEN },
    });
    return response.data.standings;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function createTable(group) {
  const table = document.createElement("table");
  table.className = "table table-borderless text-center shadow"; // إضافة كلاس لتوسيط النص

  const header = document.createElement("thead");
  header.className = "header";
  header.innerHTML = `<tr><th colspan="5" class="grouplable" >${group.group}</th></tr>`;
  table.appendChild(header);

  const body = document.createElement("tbody");
  const headerRow = document.createElement("tr");
  headerRow.className = "team-row";
  headerRow.innerHTML = `
        <th>Team</th>
        <th>W</th>
        <th>L</th>
        <th>D</th>
        <th>Pts</th>
    `;
  body.appendChild(headerRow);

  group.table.forEach((team) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><div><img src="${team.team.crest}" class="flag"> ${team.team.tla}</></td>
            <td>${team.won}</td>
            <td>${team.lost}</td>
            <td>${team.draw}</td>
            <td>${team.points}</td>
        `;
    body.appendChild(row);
  });

  table.appendChild(body);
  return table;
}

async function displayGroups() {
  const groups = await getGroups();
  if (!groups) {
    document.getElementById("tables-container").innerHTML =
      "<p>Failed to load data. Please check your API token and try again.</p>";
    return;
  }

  const container = document.getElementById("tables-container");

  groups.forEach((group, index) => {
    const col = document.createElement("div");
    col.className = "col-md-6";
    col.appendChild(createTable(group));
    container.appendChild(col);
  });
}

displayGroups();
