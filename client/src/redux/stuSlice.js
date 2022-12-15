import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStuListApi, deleteStuByIdApi, addStuApi, editStuByIdApi } from '../api/stuApi';

//- 异步获取所有学生数据
export const getStuListAsync = createAsyncThunk(
    "stu/getStuListAsync",
    async (_, thunkAPI) => {
        //- 发送 ajax 请求
        const response = await getStuListApi();
        //- 派发 action
        thunkAPI.dispatch(initStuList(response.data))
    });

//- 根据 id 异步删除学生数据
export const deleteStuAsync = createAsyncThunk('stu/deleteStuAsync', async (payload, thunkAPI) => {
    //- 和服务器进行通信，删除对应 id 的学生
    deleteStuByIdApi(payload);
    thunkAPI.dispatch(deleteStu(payload))
})
//- 异步新增学生
export const addStuAsync = createAsyncThunk('stu/addStuAsync', async (payload, thunkAPI) => {
    const { data } = await addStuApi(payload)
    //- 将 data 更新到数据仓库
    thunkAPI.dispatch(addStu(data))
})
//- 异步修改学生
export const editStuAsync = createAsyncThunk('stu/editStuAsync', async (payload, thunkAPI) => {
    editStuByIdApi(payload.id, payload.stu)
    thunkAPI.dispatch(editStu(payload))
})


export const stuSlice = createSlice({
    name: 'stu',
    initialState: {
        stuList: [],
    },
    reducers: {
        //- 初始化学生列表到仓库的 stuList 里面
        initStuList: (state, { payload }) => {
            state.stuList = payload;
        },
        //- 删除学生
        deleteStu: (state, { payload }) => {
            console.log(payload);
            for (let i = 0; i < state.stuList.length; i++) {
                if (state.stuList[i].id === ~~payload) {
                    state.stuList.splice(i, 1);
                    break;
                }
            }
        },
        //- 添加学生
        addStu: (state, { payload }) => {
            state.stuList.push(payload);
        },
        //-编辑学生
        editStu: (state, { payload }) => {
            for (let i = 0; i < state.stuList.length; i++) {
                if (state.stuList[i].id === ~~payload.id) {
                    state.stuList.splice(i, 1, payload.stu);
                    break;
                }
            }
        }
    }
})

const { initStuList, deleteStu, addStu, editStu } = stuSlice.actions
export default stuSlice.reducer;