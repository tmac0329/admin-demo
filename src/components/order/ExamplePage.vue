<template>
    <div>
        <div class="tabs">
            <div class="tab-header">
                <el-select v-model="searchDeviceStatus" placeholder="选择状态" class="tab-select" size="mini">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="故障" value="2"></el-option>
                </el-select>
                <el-select v-model="searchDeviceArea" placeholder="选择消杀区域" class="tab-select" size="mini">
                    <el-option label="教室" value="1"></el-option>
                    <el-option label="楼道" value="2"></el-option>
                    <el-option label="卫生间" value="3"></el-option>
                    <el-option label="餐厅" value="4"></el-option>
                </el-select>
                <el-button type="primary" size="mini" icon="el-icon-s-platform" class="tab-add-btn" @click="addDeviceDialogVisible = true">添加设备</el-button>
            </div>
            <el-tabs v-model="currentTabStatus" @tab-click="tabChange">
                <el-tab-pane label="工作中设备" name="atwork" class="tab-content" >
                    <el-checkbox-group v-model="selectedDevices" class="wrap">
                        <el-card 
                        v-for="device in devices"
                        :key="device.deviceId"
                        class="device-container" 
                        shadow="hover" 
                        body-style="padding:0;">
                            <div @click="onTapDevice(device)" class="device-item">
                                <div class="checkbox">
                                    <el-checkbox :label="device.deviceId" class="checkbox-fixed"><i></i></el-checkbox>
                                </div>
                                <div class="detail">
                                    <div class="main">
                                        <div class="thumb"></div>
                                        <div class="info">
                                            <p class="name">{{device.deviceName}}</p>
                                            <p class="row"><i class="el-icon-location-information"></i>消杀位置：{{device.position}}</p>
                                            <p class="row"><i class="el-icon-alarm-clock"></i>机器状态：{{device.deviceStatus}}</p>
                                            <p class="row"><i class="el-icon-timer"></i>工作状态：{{device.workStatus}}</p>
                                        </div>
                                    </div>
                                    <div class="footer">
                                        <el-button type="text" class="item" @click.stop="setTimer(device)">定时设置</el-button>
                                        <el-button type="text" class="item" @click.stop="stopDevice(device)">紧急停止</el-button>
                                        <el-button type="text" class="item" @click.stop="fixDevice(device)">转故障</el-button>
                                    </div>
                                </div>
                                <i class="el-icon-delete btn-detele" @click.stop="deleteDevice(device)"></i>
                            </div>
                        </el-card>
                    </el-checkbox-group>
                    <div class="ft-opts">
                        <el-checkbox v-model="checkAll" @change="onSelectAll">全选</el-checkbox>
                        <div class="opt-group">
                            <el-button type="danger" size="small">紧急停止</el-button>
                            <el-button type="primary" size="small" @click="onTimersSetting">批量定时设置</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="关闭中设备" name="outwork" class="tab-content" >
                    <el-checkbox-group v-model="selectedDevices" class="wrap">
                        <el-card 
                        v-for="device in devices"
                        :key="device.deviceId"
                        class="device-container" 
                        shadow="hover" 
                        body-style="padding:0;">
                            <div @click="onTapDevice(device)" class="device-item">
                                <div class="checkbox">
                                    <el-checkbox :label="device.deviceId" class="checkbox-fixed"><i></i></el-checkbox>
                                </div>
                                <div class="detail">
                                    <div class="main">
                                        <div class="thumb"></div>
                                        <div class="info">
                                            <p class="name">{{device.deviceName}}</p>
                                            <p class="row"><i class="el-icon-location-information"></i>消杀位置：{{device.position}}</p>
                                            <p class="row"><i class="el-icon-alarm-clock"></i>机器状态：{{device.deviceStatus}}</p>
                                            <p class="row"><i class="el-icon-timer"></i>工作状态：{{device.workStatus}}</p>
                                        </div>
                                    </div>
                                    <div class="footer">
                                        <el-button type="text" class="item" @click.stop="setTimer(device)">定时设置</el-button>
                                        <el-button type="text" class="item">紧急停止</el-button>
                                    </div>
                                </div>
                                <i class="el-icon-delete btn-detele"></i>
                            </div>
                        </el-card>
                    </el-checkbox-group>
                    <div class="ft-opts">
                        <el-checkbox v-model="checkAll" @change="onSelectAll">全选</el-checkbox>
                        <div class="opt-group">
                            <el-button type="danger" size="small">批量开启</el-button>
                            <el-button type="primary" size="small" @click="onTimersSetting">批量定时设置</el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            
            <!-- 定时设置弹窗 -->
            <el-dialog :title="'时间设置-' + (this.editDevice.deviceName ? this.editDevice.deviceName : '批量设置')" :visible.sync="timerDialogVisible" width="700px" @close="timerDialogClose">
                <div class="time-list">
                    <div
                    v-for="(timer,timerIndex) in this.editDevice.timers"
                    :key="timer.id"
                    class="time-item">
                        <el-popover
                            width="300"
                            trigger="click">
                            <div slot="reference">预设时间　{{timer.startTime}}~{{timer.endTime}}</div>
                                <el-time-picker
                                v-model="timer.duration"
                                is-range
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围"
                                size="small"
                                style="width:300px;"
                                value-format="HH:mm"
                                @change="timerChange($event,timer)">
                                </el-time-picker>
                        </el-popover>
                        <div class="timer-right">
                            <el-popover
                                width="304"
                                trigger="click">
                                <div slot="reference">重复　{{getRepeatDate(timer.repeat)}}</div>
                                    <el-checkbox-group v-model="timer.repeat" size="small">
                                        <el-checkbox-button label="一">一</el-checkbox-button>
                                        <el-checkbox-button label="二">二</el-checkbox-button>
                                        <el-checkbox-button label="三">三</el-checkbox-button>
                                        <el-checkbox-button label="四">四</el-checkbox-button>
                                        <el-checkbox-button label="五">五</el-checkbox-button>
                                        <el-checkbox-button label="六">六</el-checkbox-button>
                                        <el-checkbox-button label="日">日</el-checkbox-button>
                                    </el-checkbox-group>
                            </el-popover>
                            <i class="el-icon-close" @click="deleteTimer(timerIndex)"></i>
                        </div>
                    </div>
                </div>
                <el-button type="primary" @click="addTimer">添加</el-button>
                <span slot="footer">
                    <el-button @click="timerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="timerConfirm">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 添加设备弹窗 -->
            <el-dialog
                title="添加设备"
                :visible.sync="addDeviceDialogVisible"
                width="440px"
                :closed="addDeviecDialogClose('addDeviceForm')">
                <div class="form-container">
                    <el-form 
                    ref="addDeviceForm" 
                    :model="addingDeviceForm" 
                    :rules="addingDeviceRules" 
                    label-width="80px" 
                    label-position="left"
                    :hide-required-asterisk="true">
                        <el-form-item label="设备ID" prop="deviceId">
                            <el-input v-model="addingDeviceForm.deviceId" class="form-comp"></el-input>
                        </el-form-item>
                        <el-form-item label="消杀区域" prop="category">
                            <el-select v-model="addingDeviceForm.category" placeholder="请选择消杀区域" class="form-comp">
                            <el-option label="教室" value="1"></el-option>
                            <el-option label="办公室" value="2"></el-option>
                            <el-option label="食堂" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="二级区域" prop="categorySecond">
                            <el-select v-model="addingDeviceForm.categorySecond" placeholder="请选择二级消杀区域" class="form-comp">
                            <el-option label="教室101" value="11"></el-option>
                            <el-option label="教室102" value="22"></el-option>
                            <el-option label="教室103" value="33"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="设备名称" prop="deviceName">
                            <el-input v-model="addingDeviceForm.deviceName" class="form-comp"></el-input>
                        </el-form-item>
                        <el-form-item label="设备照片">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                class="upload-middle">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="设备状态">
                            <el-radio-group v-model="addingDeviceForm.deviceStatus">
                                <el-radio label="正常"></el-radio>
                                <el-radio label="故障"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDeviceDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addingDeviceConfirm('addDeviceForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            currentTabStatus: 'atwork',
            searchDeviceStatus: '1',
            searchDeviceArea: '1',
            timerDialogVisible:false,
            addDeviceDialogVisible:false,
            checkAll:false,
            // 模拟数据
            devices:[
                {
                    deviceId:1,
                    deviceName:'设备一',
                    position:'教室',
                    deviceStatus:1,
                    workStatus:1,
                    timers:[
                        {
                            id:1,
                            startTime:'08:40',
                            endTime:'10:50',
                            repeat:['一','二']
                        }
                    ]
                },
                {
                    deviceId:2,
                    deviceName:'设备二',
                    position:'教室',
                    deviceStatus:1,
                    workStatus:1,
                    timers:[
                        {
                            id:2,
                            startTime:'09:40',
                            endTime:'11:50',
                            repeat:['一','二','四','五']
                        },
                        {
                            id:12,
                            startTime:'10:45',
                            endTime:'11:50',
                            repeat:['一','二','五']
                        }
                    ]
                },
                {
                    deviceId:3,
                    deviceName:'设备三',
                    position:'教室',
                    deviceStatus:1,
                    workStatus:1,
                    timers:[
                        {
                            id:3,
                            startTime:'08:40',
                            endTime:'10:50',
                            repeat:['二']
                        }
                    ]
                }
            ],
            editDevice:{},
            addingDeviceForm:{
                deviceId:'',
                deviceName:'',
                deviceStatus:'正常'
            },
            addingDeviceRules:{
                deviceId: [
                    { required: true, message: '请输入设备ID', trigger: 'blur' }
                ],
                category: [
                    { required: true, message: '请选择消杀区域', trigger: 'change' }
                ],
                categorySecond: [
                    { required: true, message: '请选择消杀二级区域', trigger: 'change' }
                ],
                deviceName: [
                    { required: true ,message: '请输入设备名称', trigger: 'blur' }
                ]
            },
            selectedDevices:[]
        }
    },
    created(){
        
    },
    methods:{
        tabChange(tab, event){
            this.checkAll = false;
            this.selectedDevices = [];
        },
        setTimer(editDevice){
            // 修改单独设备定时器时取消设备选中状态
            this.selectedDevices = [];
            let o = this.deepCopy(editDevice);
            this.timerDialogVisible = true;
            o.timers.map(item => {
                let startArr = item.startTime.split(':');
                let endArr = item.endTime.split(':');
                this.$set(item,'duration',[new Date(2016,9,10,parseInt(startArr[0]),parseInt(startArr[1])),new Date(2016,9,11,parseInt(endArr[0]),parseInt(endArr[1]))]);
            });
            this.editDevice = o;
        },
        timerChange(v,timer){
            timer.startTime = v[0];
            timer.endTime = v[1];
        },
        getRepeatDate(days){
            return days.length > 0 ? days.join('、') : '无';
        },
        onTimersSetting(){
            if(this.selectedDevices.length <= 0){
                this.$message.warning('请选择设备');
                return;
            }
            this.timerDialogVisible = true;
            this.editDevice = {timers:[]};
            // console.log(this.selectedDevices);
        },
        onTapDevice({deviceId}){
            let deviceIdIndex = this.selectedDevices.indexOf(deviceId);
            if(deviceIdIndex !== -1){
                this.selectedDevices.splice(deviceIdIndex,1);
            }else{
                this.selectedDevices.push(deviceId);
            }
            this.checkAll = this.selectedDevices.length === this.devices.length;
        },
        onSelectAll(v){
            if(v){
                let deviceIds = [];
                this.devices.map(item => {
                    deviceIds.push(item.deviceId);
                });
                this.selectedDevices = deviceIds;
            }else{
                this.selectedDevices = [];
            }
        },
        addTimer(){
            this.editDevice.timers.push({
                            startTime:'开始时间',
                            endTime:'结束时间',
                            repeat:[],
                            duration:['','']
                        });
        },
        deleteTimer(timerIndex){
            this.editDevice.timers.splice(timerIndex,1);
        },
        timerDialogClose(){
            this.editDevice = {};
        },
        timerConfirm(){
            if(this.selectedDevices.length > 0){
                console.log('批量修改',this.selectedDevices,this.editDevice.timers);
            }else if(this.editDevice){
                console.log('修改单条',this.editDevice.deviceId,this.editDevice.timers);
            }
            this.timerDialogVisible = false;
        },
        deleteDevice(device){
            this.$alert(`确认删除 ${device.deviceName} ？`,'',{
                callback: action => {
                    this.$message({
                    type: 'success',
                    message: `删除成功`
                    });
                }
            });
        },
        stopDevice(device){
            this.$alert(`是否紧急停止 ${device.deviceName} ？`,'',{
                callback: action => {
                    this.$message({
                    type: 'success',
                    message: `停止成功`
                    });
                }
            });
        },
        fixDevice(device){
            this.$alert(`${device.deviceName} 申报故障？`,'',{
                callback: action => {
                    this.$message({
                    type: 'success',
                    message: `申报成功`
                    });
                }
            });
        },
        addingDeviceConfirm(addingFormName){
            this.$refs[addingFormName].validate((vaild) => {
                if(vaild){
                    console.log(this.addingDeviceForm);
                    this.addDeviceDialogVisible = false;
                }else{
                    return false;
                }
            });
        },
        addDeviecDialogClose(addingFormName){
            if(!this.addDeviceDialogVisible && this.$refs[addingFormName]){
                this.$refs[addingFormName].resetFields();
            }
        },
        deepCopy(obj){
            let o = Array.isArray(obj) ? [] : {};
            for(const key in obj){
                if(typeof(obj[key]) === 'object'){
                    o[key] = this.deepCopy(obj[key]);
                }else{
                    o[key] = obj[key];
                }
            }
            return o;
        }
    }
}
</script>
<style scoped>
.tabs{
    position: relative;
}
.tab-header{
    position: absolute;
    top: 0;
    right: 0;
    height: 40px;
    z-index: 9;
    display: flex;
    align-items: center;
}
.tab-select{
    width: 80px;
    margin-right: 10px;
}
.tab-add-btn{
    height: 28px;
}
.tab-content .wrap{
    display: flex;
    flex-wrap: wrap;
}
.device-container{
    width: 350px;
    margin:0 20px 20px 0;
}
.device-item{
    display:flex;
    position:relative;
}
.device-container .checkbox{
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right:1px solid #eee;
    flex-shrink: 0;
    flex-grow: 0;
}
.device-container .detail{
    flex-grow: 1;
}
.device-container .main{
    padding: 15px;
    display: flex;
    border-bottom: 1px solid #eee;
    cursor: default;
}
.device-container .thumb{
    width: 60px;
    height: 60px;
    background: #eee;
    margin-right: 15px;
}
.device-container .info{
    font-size: 14px;
}
.device-container .info p{
    margin-bottom: 5px;
    display: flex;
    align-items: center;
}
.device-container .info .row i{
    margin-right: 8px;
    font-size: 16px;
}
.device-container .footer{
    display: flex;
}
.device-container .footer .item{
    flex-grow: 1;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    position: relative;
    margin: 0;
}
.device-container .footer .item::before{
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 1px;
    height: 20px;
    margin: -10px 0 0 0;
    border-right: 1px solid #eee;
}
.device-container .footer .item:last-child::before{
    content: '';
    display: none;
}
.device-container .btn-detele{
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}
.ft-opts{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #E4E7ED;
    padding: 10px 0 10px 15px;
}
.time-item{
    display: flex;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 15px;
    box-sizing: border-box;
    justify-content: space-between;
    cursor: pointer;
    transition: all .15s;
    background: #fff;
    color: inherit;
    margin-bottom: 15px;
}
.time-item:hover{
    background: #ecf5ff;
    color: #409eff;
    border-color: #b3d8ff;
}
.time-add{
    background: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
}
.time-row{
    width: 500px;
    margin-bottom: 10px;
}
.timer-right{
    display: flex;
}
.timer-right i{
    display: flex;
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    transition: all .1s;
}
.timer-right i:hover{
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
}
.checkbox-fixed{
    margin-right: -10px;
}
.form-container{
    width: 360px;
    margin: 0 auto;
}
.form-comp{
    width: 260px;
}
</style>