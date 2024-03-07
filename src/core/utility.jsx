// 使用yarn dev 與 pdu主程式分開的測試時，請選用localhost
// const choice_of_ip = "localhost"

// 使用指定的pdu api server IP
// const choice_of_ip = "assigned-ip"
// const ip_assigned = '192.168.1.107'
const ip_assigned = "";

// 設定web使用raspberry pi for remote tunnel
// const choice_of_ip = "tunnel"
// const port = '80'

// 正式發布於pdu，請選用"host"
const choice_of_ip = "host";

const port = "8080";

export function getUrl() {
  const { protocol, hostname } = window.location;
  var url = "";
  switch (choice_of_ip) {
    case "localhost":
      url = `${protocol}//localhost:${port}`;
      break;
    case "assigned-ip":
      url = `${protocol}//${ip_assigned}:${port}`;
      break;
    case "tunnel":
      url = `${protocol}//${hostname}`;
      break;
    default:
      url = `${protocol}//${hostname}:${port}`;
  }
  console.log("[getUrl]", url);
  return url;
}

export function getUrl_api() {
  const { protocol, hostname } = window.location;
  var url = "";
  switch (choice_of_ip) {
    case "localhost":
      url = `${protocol}//localhost:${port}`;
      break;
    case "assigned-ip":
      url = `${protocol}//${ip_assigned}:${port}`;
      break;
    case "tunnel":
      url = `${protocol}//${hostname}`;
      break;
    default:
      url = `${protocol}//${hostname}:${port}`;
  }
  const url_api = url + "/auth";
  // console.log("[getUrl_api]", url_api)
  return url_api;
}

export function getWSUrl_api() {
  const { hostname } = window.location;
  var url = "";
  switch (choice_of_ip) {
    case "localhost":
      url = `ws://localhost:${port}`;
      break;
    case "assigned-ip":
      url = `ws://${ip_assigned}:${port}`;
      break;
    default:
      url = `ws://${hostname}:${port}`;
  }
  const url_ws = url + "/auth";
  return url_ws;
}

// export const getStates = async (token, setStates) => {
//     try {
//         const url = getUrl_api() + "/states"
//         // const response = await fetch('http://localhost:8080/auth/states', {
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//             const state = await response.json();
//             setStates(state)
//         } else {
//             console.log("[getStates] resp not ok:", response.status)
//         }
//       } catch (error) {
//         console.log("[getStates] err:", error)
//     }
// }

export const getStates = async (token, setStates) => {
  try {
    const url = getUrl_api() + "/states";
    // const response = await fetch('http://localhost:8080/auth/states', {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // 'Authorization': `Bearer ${token}`,
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      const state = await response.json();
      setStates(state);
    } else {
      console.log("[getStates] resp not ok:", response.status);
      // handleLogout()
      // navigate("/")
    }
  } catch (error) {
    console.log("[getStates error] err:", error);
    // handleLogout()
    // navigate("/")
  }
};

export const getStates2 = async (setStates) => {
  try {
    const url = getUrl() + "/states";
    // const url = getUrl_api() + "/states"
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const state = await response.json();
      // console.log(state)
      setStates(state);
      // console.log(state.SerialNo)
    } else {
      console.log("[getStates2] resp not ok:", response.status);
      // handleLogout()
      // navigate("/")
    }
  } catch (error) {
    console.log("[getStates2 error] err:", error);
    // handleLogout()
    // navigate("/")
  }
};

export const renderData = (states, prop) => {
  return states?.[prop] ?? "loading...";
};

export const updateStatesToServer = async (token, jsonBody) => {
  console.log("[updateStatesToServer]", jsonBody);
  try {
    const url = getUrl_api() + "/update_states";
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonBody),
    });

    if (resp.ok) {
      if (resp.headers.get("content-type")?.includes("application/json")) {
        const jsonData = await resp.json();
        console.log("resp:", jsonData);
      } else {
        const textData = await resp.text();
        console.log(textData);
      }
    } else {
      console.log("error:", resp.status);
    }
  } catch (error) {
    console.log("error:", error);
  }
};
