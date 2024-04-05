import { useRef, useState, useEffect } from "react";
import LeftSideBar from "../../components/LeftSideBar";
import Statistic from "../../components/Statistic";
import DeviceSwitch from "../../components/DeviceSwitch";
import DeviceSlider from "../../components/DeviceSlider";
import Door from "../../components/Door";
import DevicesHistory from "../../components/DevicesHistory";
import ProfileBox from "../../components/ProfileBox";
import History from "../../components/History";
import Cookies from "universal-cookie";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./style.css";

const Dashboard = () => {
  const ENDPOINT = "http://localhost:5000";

  const cookies = new Cookies();
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
  const AIOkey = "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLed = await axios.get(
          "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-led/data?limit=1"
        );
        const dataLed = responseLed.data;

        if (dataLed[0].value == 1) setCheckedLight(true);
        else setCheckedLight(false);

        const responseAir = await axios.get(
          "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-fan/data?limit=1"
        );
        const dataAir = responseAir.data;
        setCheckedAir(parseInt(dataAir[0].value));

        const responseAutoLed = await axios.get(
          "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-auto-led/data?limit=1"
        );
        const dataAutoLed = responseAutoLed.data;
        if (dataAutoLed[0].value == 1) setCheckedAutoLight(true);
        else setCheckedAutoLight(false);

        const responseAutoAir = await axios.get(
          "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-auto-fan/data?limit=1"
        );
        const dataAutoAir = responseAutoAir.data;
        if (dataAutoAir[0].value == 1) setCheckedAutoAir(true);
        else setCheckedAutoAir(false);

        const responseFrontDoor = await axios.get(
          "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-door/data?limit=1"
        );
        const dataFrontDoor = responseFrontDoor.data;
        if (dataFrontDoor[0].value == 1) setCheckedFront(true);
        else setCheckedFront(false);
      } catch (error) {
        console.error("Error fetching data from Adafruit:", error);
      }
    };

    fetchData();

    // const intervalId = setInterval(fetchData, 3000);
    // return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("dataFromServer", (message) => {
      if (message.topic == "tienhoang/feeds/bbc-led")
        setCheckedLight(message.data);
      else if (message.topic == "tienhoang/feeds/bbc-fan")
        setCheckedAir(message.data);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const token = cookies.get("token");
    const parts = token.split("232123456");
    const email = parts[0];

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${email}`
        );
        const userData = response.data;
        const fullName = `${userData.firstName} ${userData.lastName}`;
        setName(fullName);
      } catch (error) {
        console.error("Error fetching user by email:", error);
      }
    };

    fetchData();
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
        "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-door/data",
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
        "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-led/data",
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
        "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-fan/data",
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
        "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-auto-led/data",
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
        "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-auto-fan/data",
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
        <ProfileBox
          updateLeftSide={handleUpdateLeftSideBar}
          update={updateLeftSideBar}
        />
      )}
      {mode === "history" && <History deviceType={clickedDeviceType.current} />}
    </div>
  );
};
export default Dashboard;
