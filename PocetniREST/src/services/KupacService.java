package services;

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

import beans.Kupac;
import dao.KupacDAO;

@Path("/customers")
public class KupacService {

	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	
	public KupacService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("customersDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("customersDAO", new KupacDAO(contextPath)); 
		}
	}
	
	
	@GET
	@Path("/getCustomers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Kupac> getCustomers(){
		KupacDAO dao = (KupacDAO) ctx.getAttribute("customersDAO");
		Collection<Kupac> us = dao.findAll();
		if(us == null) {
			dao = new KupacDAO(ctx.getRealPath("")); 
			ctx.setAttribute("customersDAO", dao);
		}
		return us;
		
	}
	
	@POST
	@Path("/searchUsername")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Kupac searchUsername(String name) {
		KupacDAO dao = (KupacDAO) ctx.getAttribute("customersDAO");
		
		String s = name.substring(7, name.length()-2);
		Kupac user = dao.find(s);
		
		return user;
	}
		
	@POST
	@Path("/add")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Kupac add(Kupac user) {
		KupacDAO dao = (KupacDAO) ctx.getAttribute("customersDAO");
		System.out.println(user.toString());
		Kupac retVal = dao.addKupac(user);
		ctx.setAttribute("userDAO", dao);
		return retVal;
	}
	
}
