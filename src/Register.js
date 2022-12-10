import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const NIF_REGEX = /^[1-9]{9}/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [nif, setNif] = useState("");
  const [validNif, setValidNif] = useState(false);
  const [nifFocus, setNifFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); // will be use

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidNif(NIF_REGEX.test(nif));
  },[nif])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with "JS hack"
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = NIF_REGEX.test(nif);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setEmail("");
      setNif("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor");
      } else if (err.response?.status === 409) {
        setErrMsg("Usuário já existe");
      } else {
        setErrMsg("Resgistro Falhou");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Resgistro</h1>
      <form onSubmit={handleSubmit} autocomplete="off">
        <label htmlFor="username">
          Nome do usuário:
          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 a 24 caracteres.
          <br />
          Deve começar com uma letra.
          <br />
          Letras, Numeros, underscores, hífens permitidos.
        </p>

        <label htmlFor="email">
          Email:
          <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
        </label>
        <input
          type="text"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Email inválido!
        </p>

        <label htmlFor="nif">
          NIF:
          <FontAwesomeIcon icon={faCheck} className={validNif ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validNif || !nif ? "hide" : "invalid"} />
        </label>
        <input
          type="text"
          id="nif"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setNif(e.target.value)}
          value={nif}
          required
          aria-invalid={validNif ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setNifFocus(true)}
          onBlur={() => setNifFocus(false)}
        />
        <p id="uidnote" className={nifFocus && nif && !validNif ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Deve possuir 9 números.
          <br />
          NIF inválido!
        </p>

        <label for="password">
          Senha: <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
        </label>
        <input
          type="password"
          id="password"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p id="pwddnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 a 24 caracteres.
          <br />
          Deve incluir letras maiúsculas minúsculas, um numero e uma caracter especial.
          <br />
          Caracteres especiais permitidos: <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          <span aria-label="percent">.</span>
        </p>

        <label htmlFor="confirm_pwd">
          Confirme a senha:
          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          As senhas devem ser iguais.
        </p>

        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Registrar</button>
      </form>
      <p>
        Já tem conta?
        <br />
        <span className="line">
          {/*put router link here*/}
          <a href="#">Sign In</a> {/*href will change*/}
        </span>
      </p>
    </section>
  );
};

export default Register;
