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
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.HTTP;
import org.json.JSONException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.websystique.springmvc.model.User;
import com.websystique.springmvc.service.AlbumService;
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

	
	
 
	
    
    //-------------------Retrieve Single User--------------------------------------------------------
     
	@RequestMapping(value = { "/profile/" }, method = RequestMethod.POST)
    public ResponseEntity<User> getUser(@RequestBody Integer id) throws UnsupportedEncodingException {
		User user=userService.findById(id);
		if (user == null) {
            System.out.println("User not found");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }    
		
	
		return new ResponseEntity<User>(user, HttpStatus.OK);
    }
 
	
     
    @RequestMapping(value="/login/",method=RequestMethod.POST)
    public ResponseEntity<User>  login(@RequestBody User user){
   
    	User u=userService.findByEmail(user.getEmail());
    	if(!(u==null)){
    		
    		return new ResponseEntity<User>(u, HttpStatus.OK); 

    	}else{
    		
    		return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
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
        userService.saveUser(user);
        
        return new ResponseEntity<User>(user,HttpStatus.CREATED);
    }
 
    
     
    //------------------- Search Friend --------------------------------------------------------
 
    @RequestMapping(value = "/searchFriend", method = RequestMethod.POST)
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

    	//------------------- Search Album--------------------------------------------------------

    	@RequestMapping(value="/album",method=RequestMethod.POST)
    	public ResponseEntity<List<Album>> getAlbum(@RequestBody Integer id){
    		System.out.println("Search album user");
    		User user=userService.findById(id);
    		if(!(user==null)){
        		List<Album> albums=new ArrayList<Album>();
        		albums=albumService.findAllByUserId(id);
        		return new ResponseEntity<List<Album>>(albums,HttpStatus.OK);
    		}else
    			return new ResponseEntity<List<Album>>(HttpStatus.NOT_FOUND);
    		
    		
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
    public HttpStatus insertPKClient(@RequestBody String message) throws ParseException{
    	String pk;
    	
		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(message);
		
		Integer id=Integer.parseInt((String) json.get("id"));
		
		pk = (String) json.get("key");
		System.out.println(id);
		System.out.println(pk);
		User u=userService.findById(id);
		if(u!=null){
			userService.insertPK(pk, id);
			return HttpStatus.OK;

		}else{
			return HttpStatus.NOT_FOUND;

		}
    	
    	
    }
    
    
    
    //------------------- Insert PKIRMS and PKKMS --------------------------------------------------------

    @RequestMapping(value = "/savePK", method = RequestMethod.POST) 
    public void savePk(@RequestBody String message) throws JSONException, ParseException{
    	try {
    		File dir = new File("tmp/pk");
        	dir.mkdirs();
        	
    		JSONParser parser = new JSONParser();
    		JSONObject json = (JSONObject) parser.parse(message);
    		
    		File file1=new File(dir,"RMSPublicKey.txt");
    		file1.createNewFile();
    		FileWriter w=new FileWriter(file1);
        	BufferedWriter b=new BufferedWriter(w);
    		String pkRMS;
			
				pkRMS = (String) json.get("rms");
			
        	
			b.write(pkRMS);
			b.flush();
			
			File file2=new File(dir,"KMSPublicKey.txt");
    		file2.createNewFile();
			FileWriter writer=new FileWriter(file2);
        	BufferedWriter buffer=new BufferedWriter(writer);
    		String pkKMS=(String) json.get("kms");
        	
			buffer.write(pkKMS);
			buffer.flush();
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
    }
    
    //------------------- search PKRMS --------------------------------------------------------
    @RequestMapping(value = "/getPKRMS", method = RequestMethod.GET) 
    public void getPKRMS(HttpServletResponse response){
    	PrintWriter pw=null;
    	
    	try{
    		FileReader file=new FileReader("tmp/pk/RMSPublicKey.txt");
    		
        	BufferedReader bos=new BufferedReader(file);
        	String PKRMS=bos.readLine();
        	
    		
    		pw=response.getWriter();
        	pw.println("{");
        	pw.println("\"successful\":true,");
        	pw.println("\"PKRMS\":\""+PKRMS+"\"");
        	pw.println("}");
        	return;
    	}catch(IOException ex){
    		pw.println("{");
			pw.println("\"successful\": false,");
			pw.println("\"message\": \""+ex.getMessage()+"\",");
			pw.println("}");
			return;
    	}
    	

    	
    }
    
    
    
    //------------------- search PKKMS --------------------------------------------------------
    @RequestMapping(value = "/getPKKMS/", method = RequestMethod.GET) 
    public void getPKKMS(HttpServletResponse response){
    	PrintWriter pw=null;
    	try{
        	File file=new File("tmp/pk/KMSPublic");
        	FileInputStream in=new FileInputStream(file);
        	ByteArrayOutputStream bos=new ByteArrayOutputStream();
        	byte[] buf=new byte[1024];
        	
    		for(int readNum;(readNum=in.read(buf))!=-1;){
    			bos.write(buf,0,readNum);
    		}
    		pw=response.getWriter();
        	pw.println("{");
        	pw.println("\"successful\":true,");
        	pw.println("\"PKKMS\":\""+bos+"\"");
        	pw.println("}");
        	return;
    	}catch(IOException ex){
    		pw.println("{");
			pw.println("\"successful\": false,");
			pw.println("\"message\": \""+ex.getMessage()+"\",");
			pw.println("}");
			return;
    	}
    	

    	
    }
  
         
    	
    
  
    
}