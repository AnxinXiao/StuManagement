import { useState, useEffect } from "react";
// import { getStuListApi } from "../api/stuApi";
import Alert from "./Alert";
import { useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStuListAsync } from "../redux/stuSlice";

function Home(props) {
  //- 之前是在 Home 组件中维护了一个状态 stuList，用来存储从服务器获取到所有数据
  // const [stuList, setStuList] = useState([]); //- 存储所有的数据

  //- 现在应该是从仓库获取学生数据
  const { stuList } = useSelector((state) => state.stu);

  const [searchItem, setSerchItem] = useState(""); //- 存储用户输入的搜索信息
  const [alert, setAlert] = useState(null);
  const [searchList, setSerchList] = useState([]); //- 存储搜索后的数组

  const location = useLocation();
  const dispatch = useDispatch();

  //- 注意，这里需要添加依赖项为空数组，代表只执行一次
  useEffect(() => {
    //- 之前我们是直接发送请求获取数据在该组件
    //   getStuListApi().then(({ data }) => {
    //     setStuList(data);
    //   });

    if (!stuList.length) {
      //- 没有数据，发送请求
      //- 派发 action 到 仓库
      //- 仓库发送异步请求获取数据，然后将获取到的数据填充到前端仓库
      dispatch(getStuListAsync());
    }
  }, [stuList, dispatch]);

  //- 现在应该是从仓库获取数据

  //- 再来一个副作用,用于获取跳转到 Home 组件时传递的 state 数据
  useEffect(() => {
    if (location.state) {
      setAlert(location.state);
    }
  }, [location]);

  const showAlert = alert ? <Alert {...alert} /> : null;

  function handleChange(name) {
    //- 用户搜索内容存储入 searchItem 里面了
    setSerchItem(name);
    //- 过滤
    const arr = stuList.filter((item) => {
      console.log(item.age);
      return (
        item.name.match(name) ||
        item.age.toString().match(name) ||
        item.phoneNumber.toString().match(name)
      );
    });
    setSerchList(arr);
  }

  //- 最终显示列表
  const list = searchItem ? searchList : stuList;

  const trs = list.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.phoneNumber}</td>
        <td>
          <NavLink to={`/detail/${item.id}`}>详情</NavLink>
        </td>
      </tr>
    );
  });

  return (
    <div>
      {showAlert}
      <h1>学生列表</h1>
      {/* 搜索框 */}
      <input
        type="text"
        placeholder="搜索"
        value={searchItem}
        className="form-control"
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* 表格 */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>联系方式</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>{trs}</tbody>
      </table>
    </div>
  );
}

export default Home;
