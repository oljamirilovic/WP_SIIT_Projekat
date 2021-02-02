package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Komentar;
import beans.Manifestacija;
import dao.KomentarDAO;
import dao.ManifestacijaDAO;


@Path("/komentari")
public class KomentarServices {
	//dodati i odobravanje i brisanje komentara

	@Context
	ServletContext ctx;
	
	public KomentarServices() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("KomentarDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			//ctx.setAttribute("ManifestacijaDAO", new ManifestaDAO(contextPath));  //ovo jenekako se prosledi
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Komentar> getKOmentari() {
		KomentarDAO dao = (KomentarDAO) ctx.getAttribute("KomentarDAO");
		return dao.findAll();
	}

	@PUT
	@Path("/komentari/{sifra}")
	@Produces(MediaType.APPLICATION_JSON)                 //pazi kod prosledjivanja
	@Consumes(MediaType.APPLICATION_JSON)                //razmisli o proverama gde bi trebale da budu?
	public Komentar odobri(String sifra,Komentar k) {
		KomentarDAO dao = (KomentarDAO) ctx.getAttribute("KomentarDAO");
		Komentar kom=dao.odobri(k);
		return kom;
		
	}
	@DELETE
	@Path("/komentari/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void delete(String id) {
		KomentarDAO dao=(KomentarDAO) ctx.getAttribute("KomentarDAO");
		dao.obrisi(id);
	}
}
