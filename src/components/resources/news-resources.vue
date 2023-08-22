<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import UserNavigation from '../navigation/user-navigation.vue'
import { ref } from 'vue'
const input1 = ref('')
const searchBut = () => {
    alert('搜索' + input1.value)
}
const navs = [
    { id: 1, name: '优惠和公告' },
    { id: 2, name: '新闻' },
]
const id = ref(0)
const newsBut = (indexs: any) => {
    id.value = indexs
}

// 筛选
const checkedCities = ref([])
const cities = ['云托管', '云算力']

// 展示新闻
const newsList = [
    {
        id: 1,
        time: '2023/04/30',
        title: '不容错过的六个关键信息',
        content:
            '从2001年至今诞生如今市场发展迅速，挖矿始终是驱动数字经济持续发展的源动力，也是参与数字资 产行业最直接的方式。',
    },
    {
        id: 2,
        time: '2023/04/25',
        title: '不容错过的五个关键信息',
        content:
            '从2008年至今诞生如今市场发展迅速，挖矿始终是驱动数字经济持续发展的源动力，也是参与数字资 产行业最直接的方式。',
    },
    {
        id: 3,
        time: '2023/04/24',
        title: '不容错过的三个关键信息',
        content:
            '从2008年至今诞生如今市场发展迅速，挖矿始终是驱动数字经济持续发展的源动力，也是参与数字资 产行业最直接的方式。',
    },
]
</script>

<template>
    <!--    资源新闻-->
    <div class="user-box">
        <user-navigation :id="1"></user-navigation>
        <div class="news-box">
            <div class="search-box">
                <!--            搜索-->
                <div class="search">
                    <p>新闻</p>
                    <el-input
                        v-model="input1"
                        class="w-50 m-2"
                        size="large"
                        placeholder="搜索"
                        :prefix-icon="Search"
                        @keyup.enter="searchBut"
                    />
                    <el-divider />
                </div>

                <!--                按钮选择-->
                <div class="news-navs-box">
                    <div
                        v-for="(items, indexs) in navs"
                        :key="indexs"
                        :class="id === indexs ? 'announcement' : 'news'"
                        @click="newsBut(indexs)"
                    >
                        {{ items.name }}
                    </div>
                    <el-divider />
                </div>

                <!--                按钮多选-->
                <div class="screening">
                    <p>你可以依照以下筛选：</p>
                    <el-checkbox-group
                        v-model="checkedCities"
                        style="display: flex; flex-direction: column"
                    >
                        <el-checkbox
                            v-for="city in cities"
                            :key="city"
                            :label="city"
                            >{{ city }}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <!--            右侧展示-->
            <div
                v-for="(item1, index1) in newsList.slice(0, 1)"
                :key="index1"
                class="news-view-box"
            >
                <div class="banner-img"></div>
                <!--                指定新闻-->
                <div class="content-news">
                    <span>
                        <p class="time-news">{{ item1.time }}</p>
                        <p class="mark">{{ item1.title }}</p>
                    </span>
                    <p class="copywriting">
                        {{ item1.content }}
                    </p>
                </div>
                <!--                新闻剩余部分-->
                <div class="surplus-box">
                    <div
                        v-for="(item2, index2) in newsList.slice(1)"
                        :key="index2"
                        class="surplus-news"
                    >
                        <div class="box-news"></div>
                        <div class="content-box-news">
                            <span>
                                <p class="time-news">{{ item2.time }}</p>
                                <p class="mark">{{ item2.title }}</p>
                            </span>
                            <p class="copywriting">
                                {{ item2.content }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.user-box {
    width: 1920px;
    //height: 1080px;
    background-color: #fff;
    margin: 0 auto;
}
.news-box {
    width: 100%;
    background-color: #fdfdfe;
    padding: 26px 330px;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    .search-box {
        width: 353px;
        height: 855px;
        background: #f2f2f2;
        border-radius: 20px;
        padding: 30px 54px;
        box-sizing: border-box;
        .search {
            p {
                font-size: 18px;
                font-weight: 400;
                color: #333333;
                line-height: 48px;
            }
            //border-bottom: 1px solid #6aceae;
        }
        //    按钮筛选
        .screening {
            margin: 10px auto;
            p {
                line-height: 40px;
            }
        }
    }
    .news-navs-box {
        width: 251px;
        height: 174px;
        //margin: 20px auto;
        font-size: 18px;
        font-weight: 400;
        color: #ffffff;
        line-height: 18px;
        .announcement {
            width: 251px;
            height: 67px;
            background: #11173a;
            border-radius: 19px;
            margin: 10px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .news {
            width: 251px;
            height: 67px;
            background: #fff;
            border-radius: 19px;
            margin: 10px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #333333;
            cursor: pointer;
        }
    }
}
// 右侧展示新闻
.news-view-box {
    width: 800px;
    height: 1000px;
    margin: 0 auto;
    .banner-img {
        width: 800px;
        height: 460px;
        background: #f2f2f2;
        border-radius: 20px;
    }
    .content-news {
        width: 100%;
        margin: 20px auto;
        .time-news {
            font-size: 16px;
            font-weight: 400;
            color: #666666;
            line-height: 18px;
        }
        .mark {
            font-size: 18px;
            font-weight: 600;
            color: #333333;
            line-height: 48px;
        }
        .copywriting {
            font-size: 18px;
            font-weight: 400;
            color: #333333;
            margin: 10px auto;
        }
    }
    .surplus-box {
        width: 100%;
        min-height: 480px;
        display: flex;
        justify-content: space-between;
        .surplus-news {
            width: 380px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            .box-news {
                width: 380px;
                height: 388px;
                background: #f2f2f2;
                border-radius: 20px;
            }
            .content-box-news {
                margin: 20px auto;
                .time-news {
                    font-size: 16px;
                    font-weight: 400;
                    color: #666666;
                    line-height: 48px;
                }
                .mark {
                    font-size: 18px;
                    font-weight: 600;
                    color: #333333;
                    line-height: 18px;
                }
                .copywriting {
                    font-size: 18px;
                    font-weight: 400;
                    color: #333333;
                    line-height: 24px;
                    margin: 20px auto;
                }
            }
        }
    }
}
</style>
