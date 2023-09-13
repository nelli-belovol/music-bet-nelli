import axios from 'axios';
import FormData from 'form-data';

const token = localStorage.getItem('token');

export const BE_BASE_URL = 'https://musicbet-admin.devapollo.com/';
const instance = axios.create({
  //baseURL: 'http://localhost:8000/api/',
  baseURL: 'https://musicbet-admin.devapollo.com/api/',
  headers: {
    Accept: 'application/json',
    Authorization: `Beader ${token}`,
  },
  credentials: true,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

const authAPI = {
  authMe(username, email, password, c_password, phone) {
    return instance
      .post('register/', { username, email, password, c_password, phone })
      .then((res) => {
        const token = res.data.data.customer.token;
        localStorage.setItem('token', token);
        localStorage.setItem('isAuth', true);
        return res.data;
      });
  },

  logIn(email, password) {
    return instance.post('login', { email, password }).then((res) => {
      const token = res.data.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('isAuth', true);
    });
  },

  authWithGoogle() {
    return instance.get('login/google').then((res) => {
      return res.data;
    });
  },

  logOut() {
    return instance
      .get('logout')
      .then((res) => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('token');
      })
      .catch((error) => console.log(error));
  },
};

const notificationsAPI = {
  getAllNotifycations() {
    return instance.get('notifications').then(res => {
      return res.data.data.data.filter(notification => notification.type === 'Battle END').filter(notification => notification.data.indexOf("You won") != -1);
    })
  },
};

const profileAPI = {
  getProfile() {
    return instance.get('profile').then((res) => {
      return res.data;
    });
  },

  editProfile(
    avatar,
    // username,
    first_name,
    last_name,
    // email,
    // phone,
    notification_battles,
    notification_message,
    gender,
  ) {
    let data = new FormData();
    if (avatar) {
      data.append('avatar', avatar, avatar.name);
    }
    // data.append('username', username);
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    // data.append('email', email);
    // data.append('phone', phone);
    data.append('notification_battles', notification_battles);
    data.append('notification_message', notification_message);
    data.append('gender', gender);

    return instance.post('profile', data).then((res) => {
      return res.data;
    });
  },
};

const supportAPI = {
  getFaq(search = "") {
    return instance.get(`faq?search=${search}`).then((res) => {
      return res.data.data.data;
    });
  },
};

const trackAPI = {
  registerTrack(hash) {
    return instance.post('tracks/register', { hash }).then((res) => {
      return res;
    });
  },
};

const playListAPI = {
  getAllPlayLists() {
    return instance.get('playlists').then((res) => {
      return res.data;
    });
  },

  editPlaylist({ id, name, tracks }) {
    return instance.put(`playlists/${id}`, { name, tracks }).then((res) => {
      return res.data;
    })
  },

  createPlaylist(name, tracks) {
    return instance.post('playlists', { name, tracks }).then((res) => {
      return res.data;
    });
  },
};

const contactAPI = {
  createContact(name, email, subject, message) {
    return instance.post('contact', { name, email, subject, message }).then((res) => {
      return res.data;
    });
  },
};

const tokenAPI = {
  getPaypal(sum) {
    return instance.get(`paypal/request?sum=${sum}`).then((res) => {
      return res.data;
    });
  },
};

const musicAPI = {
  getMusic(params = []) {
    const queryString = params.map((param) => {
      return `&${param.name}=${param.value}`
    });
    return instance.get(`tracks?${queryString}`).then((res) => {
      return res.data;
    });
  },

  getCategories() {
    return instance.get('music-category').then((res) => {
      return res.data.data.map(catRes => {
        catRes.category_id = catRes.id;
        return catRes;
      });
    });
  },

  getCustomerMusic() {
    return instance.get('customer-tracks').then((res) => {
      return res.data;
    });
  },
};

const statisticsAPI = {
  getTopPlayers() {
    return instance.get(`statistics/customer`).then((res) => {
      return res.data.data;
    });
  },

  getTopPlaylists() {
    return instance.get(`statistics/playlist`).then((res) => {
      return res.data;
    });
  },

  getTopNFTStatistic() {
    return instance.get(`statistics/track`).then((res) => {
      return res.data;
    });
  },
};

const battleAPI = {
  endAllBattles(battleId) {
    return new Promise((resolve) => {
      resolve();
    });
    return instance.get(`battle/end-all-battles?id=${battleId}`).then((res) => {
    });
  },

  timeLeft(battleId) {
    return instance.get(`battle/time-left?id=${battleId}`).then((res) => {
      return res.data.data.time_left;
    });
  },

  addTrackToBattle(id, is_mixed) {
    return instance.post(`battle/start?track_id=${id}`, { is_mixed }).then((res) => {
      return res.data;
    });
  },

  //step - battle round: 1/2/3
  //status - battle state 0-battle start/ 1-battle completed
  showMyBattle() {
    //remove endpoint
    return instance.get(`battle/my-battle/`).then((res) => {
      return res.data;
    });
  },

  showBattleWithFilter(category_id, step = 1) {
    const categoryFilter = !isNaN(category_id) ? `$category_id=${category_id}` : "";
    return instance
      .get(`battle/all-battles?${categoryFilter}&step=${step}&status=0`)
      .then((res) => {
        return res.data;
      });
  },

  votesForCard(customer_battle_id) {
    return instance
      .post(`battle/vote`, { customer_battle_id: customer_battle_id })
      .then((res) => {
        return res.data;
      });
  },

  getBattleInfo(battle_id) {
    return instance.get(`battle/info/${battle_id}`).then((res) => {
      return res.data;
    });
  },

  getVotes(battle_id) {
    return instance.get(`battle/detail-votes/${battle_id}`).then((res) => {
      return res.data;
    });
  },
};

const userInfoAPI = {
  getUserName() {
    return instance.get(`statistics/customer`).then((res) => {
      return res.data;
    });
  },
};

export {
  authAPI,
  trackAPI,
  supportAPI,
  profileAPI,
  playListAPI,
  notificationsAPI,
  contactAPI,
  tokenAPI,
  statisticsAPI,
  musicAPI,
  battleAPI,
  userInfoAPI,
};
