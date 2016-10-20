package com.websystique.springmvc.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.Base64;
import java.io.IOException;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPrivateKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.HTTP;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UriComponentsBuilder;

import com.mysql.jdbc.util.Base64Decoder;
import com.websystique.springmvc.model.Album;
import com.websystique.springmvc.model.FriendshipRequest;
import com.websystique.springmvc.model.Public_Key;
import com.websystique.springmvc.model.SessionUser;
import com.websystique.springmvc.model.User;
import com.websystique.springmvc.service.AlbumService;
import com.websystique.springmvc.service.FriendshipRequestService;
import com.websystique.springmvc.service.Public_KeyService;
import com.websystique.springmvc.service.SessionUserService;
import com.websystique.springmvc.service.UserService;


@Controller
@RestController
public class HelloWorldRestController {

	@Autowired
	UserService userService;  //Service which will do all data retrieval/manipulation work


	@Autowired
	AlbumService albumService;

	@Autowired
	MessageSource messageSource;

	@Autowired 
	Public_KeyService pkService;

	@Autowired
	SessionUserService sessionUser;

	@Autowired
	FriendshipRequestService friendshipService;

	HttpSession session=null;


	//-------------------Retrieve Single User--------------------------------------------------------

	@RequestMapping(value = { "/profile/" }, method = RequestMethod.POST)
	public void getUser(@RequestBody Integer id,HttpServletResponse res,HttpServletRequest req) throws JSONException, IOException {

		User user=userService.findById(id);
		PrintWriter pw=null;
		SessionUser session=sessionUser.getSessionUser(user);
		JSONObject json=new JSONObject();
		pw=res.getWriter();
		if(session!=null)	{
			if (user == null) {
				System.out.println("User not found");
				pw.println("{");
				pw.println("\"successful\": false,");
				pw.println("\"message\": \""+"Not found"+"\",");
				pw.println("}");
				return;
			}    



			json.put("id", user.getId());
			json.put("email", user.getEmail());
			json.put("firstname", user.getFirstName());
			json.put("lastname", user.getLastName());
			json.put("birth_day", user.getBirth_day());
			json.put("city", user.getCity());
			json.put("photo", user.getPhoto());
			json.put("pw",user.getPw());
			json.put("session", session.getSessionId());



			pw.println(json);
		}else{
			json.put("session",0);
			pw.println(json);
		}
	}


	//-------------------Retrieve getFriendship requestor--------------------------------------------------------

	@RequestMapping(value = { "/getFriendshipRequestor/" }, method = RequestMethod.POST)
	public void getFriendshipRequestor(@RequestBody Integer id,HttpServletResponse res,HttpServletRequest req) throws JSONException, IOException {


		User user=userService.findById(id);
		PrintWriter pw=null;
		JSONObject json=new JSONObject();
		pw=res.getWriter();
		if (user == null) {
			System.out.println("User not found");
			pw.println("{");
			pw.println("\"successful\": false,");
			pw.println("\"message\": \""+"Not found"+"\",");
			pw.println("}");
			return;
		}else{    



			json.put("id", user.getId());
			json.put("email", user.getEmail());
			json.put("firstname", user.getFirstName());
			json.put("lastname", user.getLastName());
			json.put("birth_day", user.getBirth_day());
			json.put("city", user.getCity());
			json.put("photo", user.getPhoto());


			pw.println(json);
		}


	}


	//-------------------Check current Session--------------------------------------------------------

	@RequestMapping(value="/checkSession",method=RequestMethod.POST)
	public void  checkSession(@RequestBody Integer id,HttpServletRequest req,HttpServletResponse res) throws JSONException, IOException{
		User u=userService.findById(id);
		SessionUser session=sessionUser.getSessionUser(u);
		JSONObject json=new JSONObject();
		PrintWriter pw=null;

		if(session!=null){
			json.put("session", session.getSessionId());
		}else{
			json.put("session", 0);
		}
		pw=res.getWriter();
		pw.println(json);
		return;

	}

	//------------------Login user --------------------------------------------------------

	@RequestMapping(value="/login/",method=RequestMethod.POST)
	public void  login(@RequestBody User user,HttpServletResponse res) throws JSONException, IOException{

		User u=userService.findByEmail(user.getEmail());
		PrintWriter pw=null;

		if(!(u==null)){

			JSONObject json=new JSONObject();
			json.put("id", u.getId());

			json.put("email", u.getEmail());
			json.put("firstname", u.getFirstName());
			json.put("lastname", u.getLastName());

			json.put("pw",u.getPw());


			pw = res.getWriter();

			pw.println(json);


		}else{

			pw.println("{");
			pw.println("\"successful\": false,");
			pw.println("\"message\": \""+"Not found"+"\",");
			pw.println("}");
			return;
		}

	}





	//-------------------Create a User--------------------------------------------------------

	@RequestMapping(value = "/user/", method = RequestMethod.POST,consumes = { "application/json" })
	public ResponseEntity<User> createUser(@RequestBody User user) {

		System.out.println("Creating User " + user.toString());
		if (!(userService.isUserSSOUnique(user.getEmail()))) {
			System.out.println("A User with name " + user.getFirstName() + " already exist");
			return new ResponseEntity<User>(HttpStatus.CONFLICT);
		}
		user.setExponent_public(null);
		user.setModulus_public(null);
		user.setPrivate_key(null);
		userService.saveUser(user);

		return new ResponseEntity<User>(user,HttpStatus.CREATED);
	}

	//-------------------Logout: delete the session--------------------------------------------------------

	@RequestMapping(value ="/logout", method = RequestMethod.POST)
	public void logout(@RequestBody Integer id,HttpServletRequest request,HttpServletResponse response) throws IOException, JSONException {
	System.out.println("emtro nel logout");
		User user=userService.findById(id);
		SessionUser session=sessionUser.getSessionUser(user);
		if(session!=null){
		sessionUser.deleteSession(user);

		request.getSession().invalidate();
		
		}
		return;
	}

	//-------------------Login get:create a new session--------------------------------------------------------

	@RequestMapping(value = "/loginGet/", method = RequestMethod.POST)
	public void loginGet(@RequestBody String email,HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		session = request.getSession();
		session.setAttribute("email", email);
		session.setMaxInactiveInterval(3600);
		SessionUser u=new SessionUser();
		User user=userService.findByEmail(email);
		SessionUser check_session=sessionUser.getSessionUser(user);
	
		if(check_session==null){
			u.setUser(user);
			u.setSessionId(session.getId());
			u.setTimeStamp(new java.sql.Date(new java.util.Date().getTime()));
			sessionUser.saveSession(u);
		}
		
	}


	//------------------- Search Friend --------------------------------------------------------

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public ResponseEntity<List<User>> searchFriend(@RequestBody String friend) {

		StringTokenizer st=new StringTokenizer(friend);
		List<User> users=new ArrayList<User>();

		while(st.hasMoreTokens()){

			users.addAll(userService.findByLastname(st.nextToken()));

		}

		users=ordinaryList(users);
		if (users.isEmpty()){
			return new ResponseEntity<List<User>>(HttpStatus.NOT_FOUND);
		}else{
			return new ResponseEntity<List<User>>(users,HttpStatus.OK);

		}
	}

	//-------------------Pending --------------------------------------------------------

	@RequestMapping(value = "/pending", method = RequestMethod.POST)
	public void pending(HttpServletResponse res,HttpServletRequest req) throws IOException, JSONException{
		int pending=0;
		StringBuilder sb = new StringBuilder();
		BufferedReader br = req.getReader();
		String str = null;
		while ((str = br.readLine()) != null) {
			sb.append(str);
		}
		JSONObject message = new JSONObject(sb.toString());

		Integer idSessionUser=message.getInt("idSessionUser");
		Integer idSearchedUser=message.getInt("idSearchedUser");
		PrintWriter pw = res.getWriter();    	 	

		if(((friendshipService.getRequest(idSessionUser, idSearchedUser))!=null) || ((friendshipService.getRequest(idSearchedUser, idSessionUser))!=null)){
			pending=1;
		}

		pw.println(pending);
		return;


	}

	//-------------------Get Friend Request-------------------------------------------------------

	@RequestMapping(value = "/getFriendRequest/", method = RequestMethod.POST)
	public ResponseEntity<List<User>> getFriendRequest(HttpServletResponse res,HttpServletRequest req,@RequestBody Integer id) throws IOException, JSONException{
		User u=null;
		List<User> users=new ArrayList<User>();
		List<FriendshipRequest> friendshipList=friendshipService.getAllRequest(id);
		if(!(friendshipList.isEmpty())){

			for(FriendshipRequest f:friendshipList){
				u=userService.findById(f.getUser_requestor());

				users.add(u);



			}
			return new ResponseEntity<List<User>>(users,HttpStatus.OK);
		}else{

			return new ResponseEntity<List<User>>(users,HttpStatus.ACCEPTED);

		}

	}


	//------------------- delete Pending --------------------------------------------------------



	@RequestMapping(value = "/deletePending/", method = RequestMethod.POST)
	public void deletePending(HttpServletRequest req,HttpServletResponse res) throws IOException, JSONException{
		PrintWriter pw=res.getWriter();

		StringBuilder sb = new StringBuilder();
		Album album=null;
		BufferedReader br = req.getReader();
		String str = null;
		while ((str = br.readLine()) != null) {
			sb.append(str);
		}
		JSONObject message = new JSONObject(sb.toString());
		Integer id_requestor=message.getInt("id_requestor");
		Integer id_acceptor=message.getInt("id_acceptor");
		friendshipService.delete(id_requestor, id_acceptor);


	}


	//------------------- Friendship Request --------------------------------------------------------



	@RequestMapping(value = "/requestFriendship", method = RequestMethod.POST)
	public void requestFriendship(HttpServletRequest request,HttpServletResponse res) throws IOException, JSONException{

		PrintWriter pw=res.getWriter();

		StringBuilder sb = new StringBuilder();
		Album album=null;
		BufferedReader br = request.getReader();
		String str = null;
		while ((str = br.readLine()) != null) {
			sb.append(str);
		}
		JSONObject message = new JSONObject(sb.toString());
		Integer idSession=message.getInt("id_requestor");
		Integer idSearched=message.getInt("id_acceptor");

		FriendshipRequest friend_relation=new FriendshipRequest();
		friend_relation.setUser_acceptor(idSearched);
		friend_relation.setUser_requestor(idSession);
		friendshipService.save(friend_relation);

	}



	@RequestMapping(value = "/getEmailUser", method = RequestMethod.POST)
	public void getEmailUser(@RequestBody Integer id,HttpServletResponse res) {
		PrintWriter pw = null;
		try {
			pw = res.getWriter();

			User user=userService.findById(id);
			pw.println(user.getEmail());

		} catch (IOException e) {
			pw.println("{");
			pw.println("\"successful\": false,");
			pw.println("\"message\": \""+e.getMessage()+"\",");
			pw.println("}");

		}
		return;
	}


	//------------------- Search Image --------------------------------------------------------



	@RequestMapping(value = "/searchImage", method = RequestMethod.POST)
	public ResponseEntity<List<Album>> searchImage(@RequestBody String image) {
		List<Album> albums=new ArrayList<Album>();
		StringTokenizer st=new StringTokenizer(image);

		while(st.hasMoreTokens()){

			albums.addAll(albumService.findByMetaTag(st.nextToken()));
		}

		if(albums.isEmpty()){
			return new ResponseEntity<List<Album>>(HttpStatus.NOT_FOUND);

		}else{
			System.out.println(albums);
			return new ResponseEntity<List<Album>>(albums,HttpStatus.OK);

		}
	}



	//------------------- Save Album--------------------------------------------------------

	@RequestMapping(value="/saveAlbum",method=RequestMethod.POST)
	public void saveAlbum(HttpServletRequest request,HttpServletResponse res) throws IOException, JSONException{
		System.out.println("Save album user");
		PrintWriter pw=res.getWriter();

		StringBuilder sb = new StringBuilder();
		Album album=null;
		BufferedReader br = request.getReader();
		String str = null;
		while ((str = br.readLine()) != null) {
			sb.append(str);
		}
		JSONObject message = new JSONObject(sb.toString());
		Integer id=message.getInt("id");
		String metaTag=message.getString("tag");
		String fileName=message.getString("fileName");

		User user=userService.findById(id);

		album=albumService.findById(user, fileName);
		if(album==null){
			Album albumUser=new Album();
			albumUser.setFileName(fileName);
			albumUser.setMetaTag(metaTag);
			albumUser.setUser(user);
			albumService.save(albumUser);

			pw.println("{");
			pw.println("\"successful\": true,");
			pw.println("\"idAlbum\": \""+albumUser.getId()+"\"");
			pw.println("}");
			return;



		}else{
			System.out.println("file not exists");
			pw.println("{");
			pw.println("\"successful\": false,");
			pw.println("\"message\": \""+"File already exists"+"\",");
			pw.println("}");
			return;
		}


	}

	//------------------- Search Album--------------------------------------------------------

	@RequestMapping(value="/album",method=RequestMethod.POST)
	public ResponseEntity<List<Album>> getAlbum(@RequestBody Integer id){
		System.out.println("Search album user");
		User user=userService.findById(id);
		if(!(user==null)){
			List<Album> albums=new ArrayList<Album>();
			albums=albumService.findAllByUserId(user);
			return new ResponseEntity<List<Album>>(albums,HttpStatus.OK);
		}else
			return new ResponseEntity<List<Album>>(HttpStatus.NOT_FOUND);


	}

	//------------------- Search photo--------------------------------------------------------

	@RequestMapping(value="/getPhoto/",method=RequestMethod.POST)
	public void getPhoto(HttpServletResponse res,HttpServletRequest req) throws IOException, JSONException{
		PrintWriter pw=null;

		StringBuilder sb = new StringBuilder();
		BufferedReader br = req.getReader();
		String str = null;
		while ((str = br.readLine()) != null) {
			sb.append(str);
		}
		JSONObject message = new JSONObject(sb.toString());

		Integer id=message.getInt("id");
		String filename=message.getString("filename");
		User user=userService.findById(id);
		Album photo=albumService.findById(user, filename);
		pw=res.getWriter();
		JSONObject json=new JSONObject();
		json.put("idPhoto", photo.getId());

		pw.println(json);

	}


	//------------------- Delete a User --------------------------------------------------------

	@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<User> deleteUser(@PathVariable("id") Integer id) {
		System.out.println("Fetching & Deleting User with id " + id);

		User user = userService.findById(id);
		if (user == null) {
			System.out.println("Unable to delete. User with id " + id + " not found");
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	}



	//------------------- Upload Profile Photo User --------------------------------------------------------

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public void upload(@RequestBody User user,HttpServletResponse response) throws IOException {
		PrintWriter pw=response.getWriter();

		User u=userService.findById(user.getId());

		if(u==null){
			pw.println("{");
			pw.println("\"successful\": false,");
			pw.println("}");
		}else{

			userService.updateUser(user.getId(), user.getPhoto());
			pw.println("{");
			pw.println("\"successful\": true,");
			pw.println("\"IDuser\": \""+u.getId()+"\"");
			pw.println("}");


		}
		return;
	}



	public List<User> ordinaryList(List<User> user){
		Collections.sort(user, new Comparator<User>(){
			public int compare(User u1, User u2){
				return (u1.getLastName().compareTo(u2.getLastName()));
			}
		});
		return user;   
	}


	//------------------- Save PKIClient  and inviate PKRMS --------------------------------------------------------

	@RequestMapping(value = "/insertPKClient", method = RequestMethod.POST)
	public HttpStatus insertPKClient(HttpServletRequest request, HttpServletResponse response) throws ParseException, IOException, JSONException{

		StringBuilder sb = new StringBuilder();
		BufferedReader br = request.getReader();
		String str = null;
		while ((str = br.readLine()) != null) {
			sb.append(str);
		}
		JSONObject message = new JSONObject(sb.toString());

		Integer id=message.getInt("id");

		String modulus=message.getString("modulus");
		String exponent=message.getString("exponent");
		String privateKey=message.getString("private");
		String iv=message.getString("iv");
		String salt=message.getString("salt");
		User u=userService.findById(id);
		if(u!=null){

			userService.updateUserKey(id, modulus, exponent, privateKey,iv,salt);
			return HttpStatus.OK;

		}else{
			return HttpStatus.NOT_FOUND;

		}


	}


	//------------------- Get PK Client --------------------------------------------------------

	@RequestMapping(value = "/getPKClient", method = RequestMethod.POST)
	public void getPKClient(@RequestBody Integer id,HttpServletResponse res) {
		User user=userService.findById(id);
		PrintWriter pw=null;
		try{
			if(user!=null){
				JSONObject json=new JSONObject();
				json.put("exponent_public", user.getExponent_public());
				json.put("modulus_public", user.getModulus_public());
				json.put("private_key", user.getPrivate_key());
				json.put("iv", user.getIv());
				json.put("salt", user.getSalt());
				pw=res.getWriter();
				pw.println(json);
			}
		}catch(Exception ex){
			pw.println("{");
			pw.println("\"successful\": false,");
			pw.println("\"message\": \""+ex.getMessage()+"\",");
			pw.println("}");
			return;

		}


	}








	//-------------------GET PK_KMS and PK_RMS --------------------------------------------------------


	@RequestMapping(value = "/getPK", method = RequestMethod.POST)
	public void getPK(@RequestBody String nameService,HttpServletResponse res) {
		PrintWriter pw=null;
		Public_Key pk=pkService.getKey(nameService);


		try{
			if(pk!=null){
				JSONObject json=new JSONObject();
				json.put("service", pk.getService());
				json.put("modulus", pk.getModulus());
				json.put("exponent", pk.getExponent());
				pw = res.getWriter();  
				pw.println(json);
			}
		}catch(Exception ex)
		{
			pw.println("{");
			pw.println("\"successful\": false,");
			pw.println("\"message\": \""+ex.getMessage()+"\",");
			pw.println("}");
			return;
		}   
	}


}