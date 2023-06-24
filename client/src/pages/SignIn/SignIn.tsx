import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    roomName: "",
  });

  const changeForm = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const submitForm = (e: any) => {
    e.preventDefault();
    const isDisabled = Object.values(formData).some((v: any) => v === !v);

    if (isDisabled) {
      return;
    }

    navigate(`/room?name=${formData.userName}&room=${formData.roomName}`);
  };

  return (
    <div className="signin__wrapper">
      <form onSubmit={submitForm}>
        <h2>Введите свое имя и комнату в которую вас пригласили!</h2>
        <input
          name="userName"
          value={formData.userName}
          onChange={changeForm}
          placeholder="Ваше имя"
        />
        <input
          name="roomName"
          value={formData.roomName}
          onChange={changeForm}
          placeholder="Название комнаты"
        />
        <button>Войти</button>
      </form>
    </div>
  );
};

export default SignIn;
