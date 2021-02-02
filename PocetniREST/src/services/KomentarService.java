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

import beans.Komentar;
import dao.KomentarDAO;

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
	
	//TODO search and add
}
