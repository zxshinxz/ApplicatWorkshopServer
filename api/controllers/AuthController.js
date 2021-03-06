/**
 * Created by andy on 26/05/15
 * As part of IonicWorkshop
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 26/05/15
 *
 */

module.exports = {
  checkEmail: checkEmail,
  login: login,
  logout: logout,
  register: register,
};

/**
 *
 * 중복이메일 체크
 *
 *  변수:<br>
 *  <ul>
 *    <li>(<span style="color:red;">필수</span>)email: "제시한 아이디의 상품을 가져온다"</li>
 *  <ul>
 *
 * @param req {JSON}
 * @param res {JSON}
 * @return {JSON} 중복 이메일 체크를 한다.
 */
function checkEmail(req, res) {

  // 모든 변수를 하나의 Object로 가져온다
  var params = req.allParams();

  // 필수 변수가 있는지 확인
  if (!params.email)
    return res.send(400, {message: "모든 변수를 입력해주세요."});

  // 동일한 이메일 사용자 찾기
  User.findOne({email: email})
    .then(function (user) {

      // 결과
      if (user)
        res.send(200, {isAvailable: false});
      else
        res.send(200, {isAvailable: true});
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {message: "이메일 찾기를 실패 했습니다."});
    });

}

/**
 *
 * 로그인
 *
 *  변수:<br>
 *  <ul>
 *    <li>(<span style="color:red;">필수</span>)identifier: 로그인 이메일 </li>
 *    <li>(<span style="color:red;">필수</span>)password: 로그인 비밀번호</li>
 *  <ul>
 *
 * @param req {JSON}
 * @param res {JSON}
 * @return {JSON} 입력한 정보로 로그인을 한다.
 */
function login(req, res) {

  var params = req.allParams();

  User.findOne({email: params.identifier})
    .populate('roles')
    .then(function (user) {
      return [user, user.validatePassword(params.password)];
    })
    .spread(function (user) {
      req.session.authenticated = true;
      var token = AuthService.getToken(user);
      return res.send(200, {user: user, token: token});
    })
    .catch(function (err) {
      return res.send(400, err);
    });
}

/**
 *
 * 로그아웃
 *
 *  변수:<br>
 *  <ul>
 *    <li>(<span style="color:red;">필수</span>)identifier: 로그인 이메일 </li>
 *    <li>(<span style="color:red;">필수</span>)password: 로그인 비밀번호</li>
 *  <ul>
 *
 * @param req {JSON}
 * @param res {JSON}
 * @return {JSON} 로그인한 세션을 지운다.
 */
function logout(req, res) {
  delete req.session;
  res.send(200);
}

/**
 *
 * 회원가입
 *
 *  변수:<br>
 *  <ul>
 *    <li>(<span style="color:red;">필수</span>)identifier: 로그인 이메일 </li>
 *    <li>(<span style="color:red;">필수</span>)password: 로그인 비밀번호</li>
 *    .
 *    .
 *    .       나머지 정보들
 *    .
 *    .
 *  <ul>
 *
 * @param req {JSON}
 * @param res {JSON}
 * @return {JSON} 회원가입을 한다.
 */
function register(req, res) {

}


