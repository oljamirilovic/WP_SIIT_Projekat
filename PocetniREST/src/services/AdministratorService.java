package services;

import java.io.IOException;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Administrator;
import beans.Prodavac;
import dao.AdministratorDao;
import dao.ProdavacDAO;

@Path("/admins")
public class AdministratorService {
	
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;	

	public AdministratorService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("adminsDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("adminsDAO", new AdministratorDao(contextPath)); 
			/*AdministratorDao dao = (AdministratorDao) ctx.getAttribute("adminsDAO");
			 
			try {
				dao.generateJSON(contextPath);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}*/
		}
	}
	
	@GET
	@Path("/getAdmins")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Administrator> getAdmins(){
		AdministratorDao dao = (AdministratorDao) ctx.getAttribute("adminsDAO");
		Collection<Administrator> us = dao.findAll();
		if(us == null) {
			dao = new AdministratorDao(ctx.getRealPath("")); 
			ctx.setAttribute("adminsDAO", dao);
		}
		return us;
	}
	
	@POST
	@Path("/searchUsername")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Administrator searchUsername(String name) {
		AdministratorDao dao = (AdministratorDao) ctx.getAttribute("adminsDAO");
		
		String s = name.substring(7, name.length()-2);
		Administrator user = dao.find(s);
		
		return user;
	}
	
	
	@POST
	@Path("/setCurrentAdmin")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void setCurrentAdmin(Administrator m) {
		ctx.setAttribute("currentAdmin", m); 
		
	}
	
	@GET
	@Path("/getCurrentAdmin")
	@Produces(MediaType.APPLICATION_JSON)
	public Administrator getCurrentAdmin(){
		Administrator m = (Administrator)ctx.getAttribute("currentAdmin");
		return m;
	}
	
	@POST
	@Path("/saveProfileChanges")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Administrator saveProfileChanges(Administrator user) {
		Administrator k = (Administrator)ctx.getAttribute("currentAdmin");
		k.setDatumRodjenja(user.getDatumRodjenja());
		k.setIme(user.getIme());
		k.setLozinka(user.getLozinka());
		k.setPol(user.getPol());
		k.setPrezime(user.getPrezime());
		AdministratorDao dao = (AdministratorDao) ctx.getAttribute("adminsDAO");
		ctx.setAttribute("currentAdmin", k); 
		dao.updateOne(k);
		ctx.setAttribute("adminsDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return k;
	}
	
}
