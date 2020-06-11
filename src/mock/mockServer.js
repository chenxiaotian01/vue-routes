// 使用mockjs来mock接口
import Mock from 'mockjs'
import banners from './banners.json'
import floors from './floors.json'
import todays from './todays'

// 模拟返回banners数据接口

Mock.mock('/mock/banners',{code:200,data:banners})

// 模拟返回floors数据接口

Mock.mock('/mock/floors',{code:200,data:floors})
Mock.mock('/mock/todays',{code:200,data:todays})

