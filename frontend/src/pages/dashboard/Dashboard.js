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
  const [checkedFront, setCheckedFront] = useState(false);
  const [checkedBack, setCheckedBack] = useState(false);
  const [checkedLight, setCheckedLight] = useState(false);
  const [checkedAir, setCheckedAir] = useState(0);
  const [checkedAutoLight, setCheckedAutoLight] = useState(false);
  const [checkedAutoAir, setCheckedAutoAir] = useState(false);
  const clickedDeviceType = useRef("");
  const [updateLeftSideBar, setUpdateLeftSideBar] = useState(0);
  const [homes, setHomes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [deviceListHome, setDeviceListHome] = useState([]);
  const [reloadDevices, setReloadDevices] = useState(0);
  const [temp, setTemp] = useState("");
  const [AIOkey, setAIOkey] = useState("");
  const [adafruitUsername, setAdafruitUsername] = useState("");

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
    },
    borderRadius: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedOption != null) {
          const response = await axios.get(
            `http://localhost:5000/devices/air-conditioner/${selectedOption.value}`
          );
          const devices = response.data;
          setDeviceListHome(devices);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchData();
  }, [selectedOption, reloadDevices]);

  const handleSelectChange = async (selectedOption) => {
    setSelectedOption(selectedOption);
    try {
      const response = await axios.get(
        `http://localhost:5000/homes/${selectedOption.value}`
      );
      setAdafruitUsername(response.data.data.userAdafruit);
      setAIOkey(response.data.data.key);

      const newData = {
        username: response.data.data.userAdafruit,
        password: response.data.data.key,
      };
      const socket = socketIOClient(ENDPOINT);
      socket.emit("update-adafruit", newData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData2 = async () => {
      if (adafruitUsername != "") {
        try {
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
      }
    };

    fetchData2();
  }, [adafruitUsername]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("dataFromServer", (message) => {
      console.log(message.data);
      if (message.topic == `${adafruitUsername}/feeds/bbc-led`)
        setCheckedLight(message.data);
      else if (message.topic == `${adafruitUsername}/feeds/bbc-fan`) {
        setCheckedAir(message.data);
        console.log(checkedAir);
        console.log(message.topic);
        console.log(`${adafruitUsername}/feeds/bbc-fan`);
      } else if (message.topic == `${adafruitUsername}/feeds/bbc-temp`) {
        setTemp(message.data);
      }
    });

    return () => socket.disconnect();
  }, [adafruitUsername]);

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
    let data = 0;
    if (checkedFront == true) {
      setCheckedFront(false);
      data = 0;
    } else {
      setCheckedFront(true);
      data = 1;
    }
    try {
      await axios.post(
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
    let data = 0;
    if (checkedLight == true) {
      setCheckedLight(false);
      data = 0;
    } else {
      setCheckedLight(true);
      data = 1;
    }
    try {
      await axios.post(
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
      await axios.post(
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
    let data = 0;
    if (checkedAutoLight == true) {
      setCheckedAutoLight(false);
      data = 0;
    } else {
      setCheckedAutoLight(true);
      data = 1;
    }
    try {
      await axios.post(
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
    let data = 0;
    if (checkedAutoAir == true) {
      setCheckedAutoAir(false);
      data = 0;
    } else {
      setCheckedAutoAir(true);
      data = 1;
    }
    try {
      await axios.post(
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
                <h3 className="my-smart-home">My smart room</h3>
              </div>
              <div className="w-50">
                <Select
                  options={homes}
                  onChange={handleSelectChange}
                  placeholder="Select a room"
                  value={selectedOption}
                  theme={theme}
                  styles={customStyles}
                />
              </div>
            </div>
            {selectedOption === null && (
              <div className="empty-room">
                <h3>Please choose a room</h3>
              </div>
            )}
            {selectedOption != null && (
              <>
                <div className="body d-flex">
                  <div className="w-50">
                    <DeviceSwitch
                      label="Light"
                      type="light"
                      status={checkedLight}
                      onSwitch={handleChangeLight}
                    />
                  </div>
                  <div className="w-50">
                    {deviceListHome.map((device, index) => (
                      <DeviceSlider
                        key={`Air conditioner ${index + 1}`}
                        label={`Air conditioner ${index + 1}`}
                        type="airConditioner"
                        value={checkedAir}
                        onChangeSlider={handleChangeAir}
                        temperature={temp}
                        tempThreshold={device.deviceSettings}
                        deviceTempValue={device.deviceValue}
                        adafruitUsername={adafruitUsername}
                        AIOkey={AIOkey}
                        autoMode={checkedAutoAir}
                      />
                    ))}
                  </div>
                </div>
                <div className="body d-flex">
                  <div className="w-50">
                    <DeviceSwitch
                      label="Auto lighting mode"
                      type="autoLight"
                      status={checkedAutoLight}
                      onSwitch={handleChangeAutoLight}
                    />
                  </div>
                  <div className="w-50">
                    <DeviceSwitch
                      label="Auto air-conditioning mode"
                      type="autoAirConditioner"
                      status={checkedAutoAir}
                      onSwitch={handleChangeAutoAir}
                    />
                  </div>
                </div>
                <div className="body d-flex">
                  <div className="w-50">
                    <Door
                      label="Front door"
                      type="front"
                      status={checkedFront}
                      onChangeStatus={handleChangeFront}
                    />
                  </div>
                  <div className="w-50">
                    <Door
                      label="Back door"
                      type="back"
                      status={checkedBack}
                      onChangeStatus={handleChangeBack}
                    />
                  </div>
                </div>
                <DevicesHistory mode={mode} onChangeMode={handleHistoryClick} />
              </>
            )}
            <br></br>
            <br></br>
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
            <HomeSettingBox
              key={index}
              homeName={home.value}
              onSaveReload={setReloadDevices}
            />
          ))}
        </div>
      )}
      {mode === "history" && <History deviceType={clickedDeviceType.current} />}
    </div>
  );
};
export default Dashboard;
