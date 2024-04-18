import { useRef, useState, useEffect } from "react";
import LeftSideBar from "../../components/LeftSideBar";
import Statistic from "../../components/Statistic";
import DeviceSwitch from "../../components/DeviceSwitch";
import DeviceSlider from "../../components/DeviceSlider";
import Door from "../../components/Door";
import DevicesHistory from "../../components/DevicesHistory";
import ProfileBox from "../../components/ProfileBox";
import HomeSettingBox from "../../components/HomeSettingBox";
import History from "../../components/History";
import Cookies from "universal-cookie";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./style.css";
import Select from "react-select";
const cookies = new Cookies();
const ENDPOINT = "http://localhost:5000";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [mode, setMode] = useState("dashboard");
  const [checkedFront, setCheckedFront] = useState(0);
  const [checkedBack, setCheckedBack] = useState(0);
  const [checkedLight, setCheckedLight] = useState(0);
  const [checkedAir, setCheckedAir] = useState(0);
  const [checkedAutoLight, setCheckedAutoLight] = useState(0);
  const [checkedAutoAir, setCheckedAutoAir] = useState(0);
  const clickedDeviceType = useRef("");
  const [updateLeftSideBar, setUpdateLeftSideBar] = useState(0);
  const [homes, setHomes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [AIOkey, setAIOkey] = useState(``);
  const [adafruitUsername, setAdafruitUsername] = useState(`tienhoang`);

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 50,
    }),
  };

  const theme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "#f3f3f3",
      primary: "#5640DC",

      // All possible overrides
      // primary: '#2684FF',
      // primary75: '#4C9AFF',
      // primary50: '#B2D4FF',
      // primary25: '#DEEBFF',

      // danger: '#DE350B',
      // dangerLight: '#FFBDAD',

      // neutral0: 'hsl(0, 0%, 100%)',
      // neutral5: 'hsl(0, 0%, 95%)',
      // neutral10: 'hsl(0, 0%, 90%)',
      // neutral20: 'hsl(0, 0%, 80%)',
      // neutral30: 'hsl(0, 0%, 70%)',
      // neutral40: 'hsl(0, 0%, 60%)',
      // neutral50: 'hsl(0, 0%, 50%)',
      // neutral60: 'hsl(0, 0%, 40%)',
      // neutral70: 'hsl(0, 0%, 30%)',
      // neutral80: 'hsl(0, 0%, 20%)',
      // neutral90: 'hsl(0, 0%, 10%)',
    },
    // Other options you can use
    borderRadius: 10,
    // baseUnit: 4,
    // controlHeight: 500,
    // menuGutter: baseUnit * 2
  });
  const handleSelectChange = async (selectedOption) => {
    setSelectedOption(selectedOption);
    try {
      const response = await axios.get(
        `http://localhost:5000/homes/${selectedOption.value}`
      );
      setAdafruitUsername(response.data.data.userAdafruit);
      setAIOkey(response.data.data.key);

      const responseLed = await axios.get(
        `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-led/data?limit=1`
      );
      const dataLed = responseLed.data;

      if (dataLed[0].value == 1) setCheckedLight(true);
      else setCheckedLight(false);

      const responseAir = await axios.get(
        `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-fan/data?limit=1`
      );
      const dataAir = responseAir.data;
      setCheckedAir(parseInt(dataAir[0].value));

      const responseAutoLed = await axios.get(
        `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-auto-led/data?limit=1`
      );
      const dataAutoLed = responseAutoLed.data;
      if (dataAutoLed[0].value == 1) setCheckedAutoLight(true);
      else setCheckedAutoLight(false);

      const responseAutoAir = await axios.get(
        `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-auto-fan/data?limit=1`
      );
      const dataAutoAir = responseAutoAir.data;
      if (dataAutoAir[0].value == 1) setCheckedAutoAir(true);
      else setCheckedAutoAir(false);

      const responseFrontDoor = await axios.get(
        `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-door/data?limit=1`
      );
      const dataFrontDoor = responseFrontDoor.data;
      if (dataFrontDoor[0].value == 1) setCheckedFront(true);
      else setCheckedFront(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("dataFromServer", (message) => {
      if (message.topic == `${adafruitUsername}/feeds/bbc-led`)
        setCheckedLight(message.data);
      else if (message.topic == `${adafruitUsername}/feeds/bbc-fan`)
        setCheckedAir(message.data);
      else if (message.topic == `${adafruitUsername}/feeds/bbc-temp`) {
        if (message.data <= 25) {
          handleChangeAir(0);
        } else if (message.data <= 28) {
          handleChangeAir(25);
        } else if (message.data <= 32) {
          handleChangeAir(50);
        } else if (message.data > 32) {
          handleChangeAir(75);
        }
      }
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const token = cookies.get("token");
    const parts = token.split("232123456");
    const email = parts[0];

    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${email}`
        );
        const userData = response.data;
        const fullName = `${userData.firstName} ${userData.lastName}`;
        setName(fullName);
        const options = userData.home.map((home, index) => ({
          label: home,
          value: home,
        }));
        setHomes(options);
      } catch (error) {
        console.error("Error fetching user by email:", error);
      }
    };

    fetchData2();
  }, [cookies]);

  const handleChangeFront = async (nextChecked) => {
    var data = 0;
    if (checkedFront == true) {
      setCheckedFront(false);
      data = 0;
    } else {
      setCheckedFront(true);
      data = 1;
    }
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-door/data`,
        {
          value: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": AIOkey,
          },
        }
      );
    } catch (error) {
      console.error("Error sending data to Adafruit:", error);
    }
  };

  const handleChangeBack = (nextChecked) => {
    setCheckedBack(nextChecked);
  };

  const handleChangeLight = async (nextChecked) => {
    var data = 0;
    if (checkedLight == true) {
      setCheckedLight(false);
      data = 0;
    } else {
      setCheckedLight(true);
      data = 1;
    }
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-led/data`,
        {
          value: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": AIOkey,
          },
        }
      );
    } catch (error) {
      console.error("Error sending data to Adafruit:", error);
    }
  };

  const handleChangeAir = async (nextChecked) => {
    setCheckedAir(nextChecked);
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-fan/data`,
        {
          value: nextChecked,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": AIOkey,
          },
        }
      );
    } catch (error) {
      console.error("Error sending data to Adafruit:", error);
    }
  };

  const handleChangeAutoLight = async (nextChecked) => {
    var data = 0;
    if (checkedAutoLight == true) {
      setCheckedAutoLight(false);
      data = 0;
    } else {
      setCheckedAutoLight(true);
      data = 1;
    }
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-auto-led/data`,
        {
          value: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": AIOkey,
          },
        }
      );
    } catch (error) {
      console.error("Error sending data to Adafruit:", error);
    }
  };

  const handleChangeAutoAir = async (nextChecked) => {
    var data = 0;
    if (checkedAutoAir == true) {
      setCheckedAutoAir(false);
      data = 0;
    } else {
      setCheckedAutoAir(true);
      data = 1;
    }
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-auto-fan/data`,
        {
          value: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": AIOkey,
          },
        }
      );
    } catch (error) {
      console.error("Error sending data to Adafruit:", error);
    }
  };

  const handleHistoryClick = (type) => {
    clickedDeviceType.current = type;
    setMode("history");
  };

  const handleUpdateLeftSideBar = async (state) => {
    setUpdateLeftSideBar((prevState) => prevState + parseInt(state, 10));
  };

  return (
    <div className="dashboard">
      <LeftSideBar
        mode={mode}
        onChangeMode={setMode}
        update={updateLeftSideBar}
      />
      {mode === "dashboard" && (
        <>
          <div className="main-board">
            <div className="welcome-text">
              <h3>
                Hello <span>{name},</span>
              </h3>
              <h1>have a good day!</h1>
            </div>
            <div className="body d-flex">
              <div className="w-50">
                <h3 className="my-smart-home">My smart home</h3>
                <br></br>
                <DeviceSwitch
                  label="Light"
                  type="light"
                  status={checkedLight}
                  onSwitch={handleChangeLight}
                />
                <DeviceSwitch
                  label="Auto lighting mode"
                  type="autoLight"
                  status={checkedAutoLight}
                  onSwitch={handleChangeAutoLight}
                />
                <Door
                  label="Front door"
                  type="front"
                  status={checkedFront}
                  onChangeStatus={handleChangeFront}
                />
              </div>
              <div className="w-50">
                <Select
                  options={homes}
                  onChange={handleSelectChange}
                  placeholder={selectedOption}
                  value={selectedOption}
                  theme={theme}
                  styles={customStyles}
                />
                <br></br>
                <DeviceSlider
                  label="Air conditioner"
                  type="airConditioner"
                  value={checkedAir}
                  onChangeSlider={handleChangeAir}
                />
                <DeviceSwitch
                  label="Auto air-conditioning mode"
                  type="autoAirConditioner"
                  status={checkedAutoAir}
                  onSwitch={handleChangeAutoAir}
                />
                <Door
                  label="Back door"
                  type="back"
                  status={checkedBack}
                  onChangeStatus={handleChangeBack}
                />
              </div>
            </div>
            <DevicesHistory mode={mode} onChangeMode={handleHistoryClick} />
          </div>
          <Statistic />
        </>
      )}
      {mode === "setting" && (
        // <ProfileBox
        //   updateLeftSide={handleUpdateLeftSideBar}
        //   update={updateLeftSideBar}
        // />

        <div className="setting">
          <ProfileBox
            updateLeftSide={handleUpdateLeftSideBar}
            update={updateLeftSideBar}
          />
          <h5 className="home-setting">Home Settings</h5>
          {homes.map((home, index) => (
            <HomeSettingBox key={index} homeName={home.value} />
          ))}
        </div>
      )}
      {mode === "history" && <History deviceType={clickedDeviceType.current} />}
    </div>
  );
};
export default Dashboard;
