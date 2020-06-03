import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home/Home.vue')
const Fm = () => import('../views/Fm/Fm.vue')
const Look = () => import('../views/Look/Look.vue')
const Video = () => import('../views/Video/Video.vue')
const Friend = () => import('../views/Friend/Friend.vue')
const FindMusic = () => import('../views/FindMusic/FindMusic.vue')
const Recommend = () => import('../views/FindMusic/Recommend.vue')
const SongList = () => import('../views/FindMusic/SongList.vue')
const AnchorStation = () => import('../views/FindMusic/AnchorStation.vue')
const LeaderBoard = () => import('../views/FindMusic/LeaderBoard.vue')
const Singer = () => import('../views/FindMusic/Singer.vue')
const LatestMusic = () => import('../views/FindMusic/LatestMusic.vue')
const SongListDetail = () => import('../views/SongListDetail/SongListDetail.vue')
const CurrentMvDetail = () => import('../views/CurrentMvDetail/CurrentMvDetail.vue')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'home'
  },
  {
    path: '/home',
    component: Home,
    redirect:'/findmusic',
    children:[
      {
        path: '/findmusic',
        component: FindMusic,
        redirect:'/findmusic/recommend',
        children:[
          {
            path: '/findmusic/recommend',
            component: Recommend,
          },
          {
            path: '/findmusic/songlist',
            component: SongList,
          },
          {
            path: '/findmusic/anchorstation',
            component: AnchorStation,
          },
          {
            path: '/findmusic/leaderboard',
            component: LeaderBoard,
          },
          {
            path: '/findmusic/singer',
            component: Singer,
          },
          {
            path: '/findmusic/latestmusic',
            component: LatestMusic,
          }
        ]
      },
      {
        path: '/fm',
        component: Fm,
      },
      {
        path: '/look',
        component: Look,
      },
      {
        path: '/video',
        component: Video,
      },
      {
        path: '/friend',
        component: Friend,
      },
      {       
        path: '/songlistdetail',
        name: 'songlistdetail',
        component: SongListDetail,
      },
      {       
        path: '/currentmvdetail',
        name: 'currentmvdetail',
        component: CurrentMvDetail,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
