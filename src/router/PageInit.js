import Layout from '../pages/Layout'
//社区路由配置
import CommunityPlatform from '../pages/Community/CommunityPlarform'
import CommunityIndex from '../pages/Community/CommunityIndex'
import Monitor from '../pages/Community/Monitor'
import PoliceStrength from '../pages/Community/PoliceStrength'
//数据中心路由配置
import DataCenter from '../pages/DataCenter/DataCenter'
import CitySet from '../pages/DataCenter/CitySet'
import OrganizeManage from '../pages/DataCenter/OrganizeManage'
//Demo示例卡
import AuthorizeService from '../pages/AuthService/AuthorizeService'
import AccountPage from '../pages/AuthService/AccountPage'
import AuthorizePage from '../pages/AuthService/AuthorizePage'
import myNew from '../pages/AuthService/myNew'

import LableService from '../pages/LableService/LableService'
import FormInfo from '../pages/LableService/FormInfo'
import Error from '../pages/Page404'

import AuthorizeModule from '../authorize/AuthorizeModule'

//对数据进行分组,也可以直接加载进入
const community = [CommunityPlatform,CommunityIndex, Monitor,PoliceStrength];
const datacenter=[DataCenter,CitySet,OrganizeManage];
const lableService=[AuthorizeService,AccountPage,AuthorizePage,myNew];
const formInfo = [LableService,FormInfo];

AuthorizeModule.Init([Layout,...community,...datacenter,...lableService,...formInfo,Error]);