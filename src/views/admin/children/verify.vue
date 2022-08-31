<template>
  <div id="video">
    <main>
      <div class="table">
        <el-table :data="videosFilter" style="width: 100%">
          <el-table-column sortable prop="_id" label="_id"></el-table-column>
          <el-table-column sortable prop="email" label="作者邮箱"></el-table-column>
          <el-table-column sortable prop="title" label="标题"></el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              {{scope.row.type|videoTypeFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>
          <el-table-column label="上传时间">
            <template slot-scope="scope">
              {{scope.row.uploadAt|fullDateFormat}}
            </template>
          </el-table-column>
          <el-table-column label="封面">
            <template slot-scope="scope">
              <el-image style="width: 100px;height: 75px" fit="cover" :src="scope.row.imgUrl|urlFormat"></el-image>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button @click="editVideo(scope.$index, scope.row)">查看</el-button>
              <el-button @click="adoptVerify(scope.row._id)" v-if="scope.row.isAdopt===false">通过</el-button>
              <el-button type="danger" @click="deleteVideo(scope.$index, scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--        分页-->
        <el-pagination
          style="text-align: center;margin: 8px 0"
          background
          :current-page="page"
          layout="prev, pager, next,total"
          :total="count"
          :page-size="pageSize"
          @current-change="handleCurrent"
          hide-on-single-page
        ></el-pagination>
        <el-dialog title="查看视频" :visible.sync="dialogFormVisible" @close="close">
          <d-player :options="options"></d-player>
        </el-dialog>
      </div>
    </main>
  </div>
</template>
<script>
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
import {getAll, deleteVideo, changeVideoById} from '../../../api/video'
export default {
  name: 'User',
  components: {
  'd-player': VueDPlayer
},
computed: {
  videosFilter () {
    let result = this.videos.filter(data => data.isAdopt===false)
    this.count = result.length
    return result.slice((this.page - 1) * this.pageSize, this.pageSize * this.page)
  }
},
data () {
  return {
    page: 1,
    count: 0,
    pageSize: 6,
    videos: [],
    dialogFormVisible: false,
    newVideo: {},
    options: {
      video: {
        url: ''
      }
  },
  }
},
methods: {
  close(){
    location.reload()
  },
  editVideo (index, video) {
    this.dialogFormVisible = true
    this.newVideo = video
    this.options.video.url = 'http://localhost:3000' + this.newVideo.videoUrl
  },
  async adoptVerify (id) {
    this.$confirm('确认通过审核吗?', {type: 'warning'}).then(async () => {
      await changeVideoById(id)
    })
  },
  deleteVideo (index, _id) {
    this.$confirm('是否删除?', {type: 'warning'}).then(async () => {
      let result = await deleteVideo(_id)
      this.videos = result.data
    })
  },
  handleCurrent (index) {
    this.page = index
  },
  async init () {
    let result = await getAll()
    this.videos = result.data
  }
},
created () {
  this.init()
}
}
</script>
<style lang="scss" scoped>
#video {
  main {
    margin: 2rem;
    border-radius: 4px;
    background-color: white;
    padding: 1rem;
  }
}
</style>
