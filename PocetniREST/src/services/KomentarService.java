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

import beans.Komentar;
import beans.Kupac;
import beans.TipKupca;
import dao.KomentarDAO;
import dao.KupacDAO;

@Path("/comments")
public class KomentarService {

	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	public KomentarService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("commentsDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("commentsDAO", new KomentarDAO(contextPath)); 
		}
	}
	
	@GET
	@Path("/getComments")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Komentar> getComments(){
		KomentarDAO dao = (KomentarDAO) ctx.getAttribute("commentsDAO");
		
		Collection<Komentar> us = dao.findAll();
		if(us == null) {
			dao = new KomentarDAO(ctx.getRealPath("")); 
			ctx.setAttribute("commentsDAO", dao);
		}
		return us;
	}
	
	@POST
	@Path("/getScore")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public double getScore(String eventName) {
		KomentarDAO dao = (KomentarDAO) ctx.getAttribute("commentsDAO");
		String s = eventName.substring(7, eventName.length()-2);
		double score = dao.findAverageEventScore(s);
		return score;
	}
	
	
	@POST
	@Path("/getCommentsForEvent")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Komentar> getCommentsForEvent(String eventName){
		KomentarDAO dao = (KomentarDAO) ctx.getAttribute("commentsDAO");
		String s = eventName.substring(7, eventName.length()-2);
		
		Collection<Komentar> us = dao.findByEvent(s);
		
		return us;
	}
	
	@POST
	@Path("/add")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Komentar add(Komentar kom) {
		KomentarDAO dao = (KomentarDAO) ctx.getAttribute("commentsDAO");
		int i = dao.findAll().size();
		kom.setId(i+1);
		Komentar retVal = dao.addKomentar(kom);
		ctx.setAttribute("commentsDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return retVal;
	}
}
