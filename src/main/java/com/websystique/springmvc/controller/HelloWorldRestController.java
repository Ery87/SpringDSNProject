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
import org.json.JSONObject;
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
import com.websystique.springmvc.model.Public_Key;
import com.websystique.springmvc.model.User;
import com.websystique.springmvc.service.AlbumService;
import com.websystique.springmvc.service.Public_KeyService;
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
	

 
	
	@RequestMapping(value = "/prova/", method = RequestMethod.POST)
    public void uploadReq (HttpServletRequest request, HttpServletResponse response) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException, JSONException{
    	
    	
    	
    	StringBuilder sb = new StringBuilder();
        BufferedReader br = request.getReader();
        String str = null;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
        JSONObject messaggioInChiaro = new JSONObject(sb.toString());
        
        String paramRMS=messaggioInChiaro.getString("paramRMS");			//ACCEDO ALLA KEYSIMM CIFRATA TRAMITE CHIAVE PUBBLICA DI RMS
        
        RSAPrivateKeySpec spec = new RSAPrivateKeySpec(new BigInteger("17714908574856389042047912980040795159637941050288872641206841191521734706784824832587434981882447608061483516636172075038361031641464335903337528243013601798968698688028612808889155394216948237201735891627985050112232818125882516408062750119579076532728058982496002319380681963642398518248582531197827290636948450219681285816430149218145081558444117686831521075752620790347565538493795037354011541355760251161663100066112133754391379261720042326840236102811977234477719273601679510118145984721644619247954955084233630790301208917025621493044134461979822724888691405830185658708289093804087754091527782031674415494421"), new BigInteger("3193100309669019389866975846212397778671635833606397188009466637097307659661704621013402649510617721196122873827350973075181330649566171781224746648987895052431713957027053467680967890991116613913729741791680842836501614058029054829004154403811398615760815428845160373511817691327153420145421753223979336623450286456680659702981887841904851516103670703517747044018559696301849847656525215149550874762061740130122693552122371039672803732736921211104351033717193752619213654445454041991222502562351748180793135077431242863828024145583498865011149171566439944824817170908360572903125256698750197062617755564419422244029"));
    	KeyFactory factory = KeyFactory.getInstance("RSA");
    	PrivateKey priv = factory.generatePrivate(spec);

    	Cipher cipher;
        
        byte[] dectyptedText = new byte[1];
        try {
          cipher = javax.crypto.Cipher.getInstance("RSA");
          
          byte[] messaggioCifratoBytes = new byte[256];

          BigInteger messaggioCifrato = new BigInteger(paramRMS.toString(), 16);
          if (messaggioCifrato.toByteArray().length > 256) {
              for (int i=1; i<257; i++) {
            	  messaggioCifratoBytes[i-1] = messaggioCifrato.toByteArray()[i];
              }
          } else {
        	  messaggioCifratoBytes = messaggioCifrato.toByteArray();
          }
         
          cipher.init(Cipher.DECRYPT_MODE, priv);
          dectyptedText = cipher.doFinal(messaggioCifratoBytes);
          } catch(NoSuchAlgorithmException e) {
        	  System.out.println(e);
          } catch(NoSuchPaddingException e) { 
        	  System.out.println(e);
          } catch(InvalidKeyException e) {
        	  System.out.println(e);
          } catch(IllegalBlockSizeException e) {
        	  System.out.println(e);
          } catch(BadPaddingException e) {
        	  System.out.println(e);
          }
          String messaggioDecifrato = new String(dectyptedText);
          JSONObject AESSimmKey = new JSONObject(messaggioDecifrato);
          
          String salt=AESSimmKey.getString("salt");							//ACCEDO ALLA KEYSIMM in CHIARO
          String iv=AESSimmKey.getString("iv");
          String passphrase=AESSimmKey.getString("passPhrase");
          
          AesUtil aesUtil=new AesUtil(128, 1000);
          String strmsgRMS=aesUtil.decrypt(salt, iv, passphrase, messaggioInChiaro.getString("encryptmsgRMS"));		//OTTENGO LA STRINGA DEL MESSAGGIO A RMS
          
          JSONObject jsonmsgRMS=new JSONObject(strmsgRMS);							//MSG IN JSON A RMS
          
          int idu=jsonmsgRMS.getInt("idu");
          String idresource=jsonmsgRMS.getString("idR");
          int n1=jsonmsgRMS.getInt("n1");
          String msgKMS=jsonmsgRMS.getString("msgKMS");								//ACCEDO ALLA STRINGA DEL MSG CIFRATO TRAMITE CHIAVE PUBBLICA DI KMS
          
          

          
          dectyptedText = new byte[1];
          try {
            cipher = javax.crypto.Cipher.getInstance("RSA");
            
            byte[] messaggioCifratoBytes = new byte[256];

            BigInteger messaggioCifrato = new BigInteger(msgKMS.toString(), 16);
            if (messaggioCifrato.toByteArray().length > 256) {
                for (int i=1; i<257; i++) {
              	  messaggioCifratoBytes[i-1] = messaggioCifrato.toByteArray()[i];
                }
            } else {
          	  messaggioCifratoBytes = messaggioCifrato.toByteArray();
            }
           
            cipher.init(Cipher.DECRYPT_MODE, priv);
            dectyptedText = cipher.doFinal(messaggioCifratoBytes);
            } catch(NoSuchAlgorithmException e) {
          	  System.out.println(e);
            } catch(NoSuchPaddingException e) { 
          	  System.out.println(e);
            } catch(InvalidKeyException e) {
          	  System.out.println(e);
            } catch(IllegalBlockSizeException e) {
          	  System.out.println(e);
            } catch(BadPaddingException e) {
          	  System.out.println(e);
            }
            messaggioDecifrato = new String(dectyptedText);
            JSONObject jsonmsgKMS = new JSONObject(messaggioDecifrato);				//MSG IN CHIARO DESTINATO A KMS
   
            System.out.println(jsonmsgKMS);
          
          
    	
    	
    }
	
	
	
	
	
	
	
	
	
    
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
        user.setExponent_public(null);
        user.setModulus_public(null);
        user.setPrivate_key(null);
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
    public HttpStatus insertPKClient(HttpServletRequest request, HttpServletResponse response) throws ParseException, IOException, JSONException{
    	
    	StringBuilder sb = new StringBuilder();
        BufferedReader br = request.getReader();
        String str = null;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
        JSONObject messagge = new JSONObject(sb.toString());
    	
		Integer id=messagge.getInt("id");
		
		String modulus=messagge.getString("modulus");
		String exponent=messagge.getString("exponent");
		String privateKey=messagge.getString("private");
		User u=userService.findById(id);
		if(u!=null){
			
			userService.updateUserKey(id, modulus, exponent, privateKey);
			return HttpStatus.OK;

		}else{
			return HttpStatus.NOT_FOUND;

		}
    	
    	
    }
    
    
    //------------------- Save PKI  --------------------------------------------------------

  
   
  
    
    

    	
    
  
    	  
        //-------------------GET PK_KMS --------------------------------------------------------

      
        @RequestMapping(value = "/getPK", method = RequestMethod.POST)
        public ResponseEntity<Public_Key> getKMS(@RequestBody String nameService) {
        	
        	Public_Key pk=pkService.getKey(nameService);
        	System.out.println(pk.toString());
        	if(pk!=null){
                return new ResponseEntity<Public_Key>(pk,HttpStatus.OK);

        	}else{
                return new ResponseEntity<Public_Key>(HttpStatus.NOT_FOUND);

        	}
        }
        
      /*  @RequestMapping(value = "/createSocialUser/", method = RequestMethod.POST)
        public  HttpStatus createUser(@RequestBody Integer idu, HttpServletResponse response ) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException, JSONException {
        return HttpStatus.OK;
        }
       
        @RequestMapping(value = "/clientKeys/", method = RequestMethod.POST)
        public void clientKeys (HttpServletRequest request, HttpServletResponse response) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException, JSONException{
        	JSONObject jsonmsg = new JSONObject();
    	   	jsonmsg.put("client_modulus", "nfkjnkjfjernfkjlfr");
    	   	jsonmsg.put("client_public_exponent", "nfkjnkjfjernfkjlfr");
    	   	jsonmsg.put("client_private_exponent", "nfkjnkjfjernfkjlfr");
    	   	PrintWriter pw = null;
            try{
              	pw = response.getWriter();    	 	
            	pw.println(jsonmsg);
            	}catch(Exception ex)
              	{
              	pw.println("{");
              	pw.println("\"successful\": false,");
              	pw.println("\"message\": \""+ex.getMessage()+"\",");
              	pw.println("}");
              	return;
              	} 
        	
        }*/
      
    
}