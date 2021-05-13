package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Karta;
import beans.Manifestacija;
import beans.Prodavac;
import dao.KartaDAO;
import dao.ProdavacDAO;

@Path("/salesmen")
public class ProdavacService {
	
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;	

	public ProdavacService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("salesmenDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("salesmenDAO", new ProdavacDAO(contextPath)); 
		}
	}
	
	@GET
	@Path("/getSalesman")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Prodavac> getSalesman(){
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		Collection<Prodavac> us = dao.findAll();
		if(us == null) {
			dao = new ProdavacDAO(ctx.getRealPath("")); 
			ctx.setAttribute("salesmenDAO", dao);
		}
		return us;
	}
	
	@POST
	@Path("/searchUsername")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac searchUsername(String name) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		
		String s = name.substring(7, name.length()-2);
		Prodavac user = dao.find(s);
		
		return user;
	}
	
	@POST
	@Path("/setCurrentSalesmen")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void setCurrentSalesmen(Prodavac m) {
		ctx.setAttribute("currentSalesmen", m); 
		
	}
	
	@GET
	@Path("/getCurrentSalesmen")
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac getCurrentSalesmen(){
		Prodavac m = (Prodavac)ctx.getAttribute("currentSalesmen");
		return m;
	}
	
	@POST
	@Path("/add")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac add(Prodavac user) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("ProdavacDAO");
		Prodavac retVal = dao.addUser(user);
		ctx.setAttribute("ProdavacDAO", dao);
		return retVal;
	}


	@GET
	@Path("/search")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac search(String lastname) {
		//TODO: razmisli
		return null;
		/*UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.findAll().stream().filter(user -> user.getPrezime()
				.equals(lastname)).findFirst().orElse(null);*/

	}



	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Prodavac> getProdavci() {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("ProdavacDAO");
		return dao.findAll();
	}

	@GET
	@Path("/manifestacije")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Manifestacija> getManifestacijeOfProdavac(String username) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("ProdavacDAO");
		return dao.find(username).getManifestacije();
	}

	@GET
	@Path("/myConsumers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<String> getKupciOfProdavac(String username) {
		System.out.println("n");
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("ProdavacDAO");
		KartaDAO dao2=(KartaDAO) ctx.getAttribute("KartaDAO");
		if(dao2!=null) {
			return dao.nadjiKupce(username, dao2.getKarte().values());
		}return null;
	}
	@GET
	@Path("/pregledRezervisanihKarata")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Karta> getKarteiOfProdavac(String username) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("ProdavacDAO");
		KartaDAO dao2=(KartaDAO) ctx.getAttribute("KartaDAO");
		if(dao2!=null) {
			return dao.nadjiKarte(username, dao2.getKarte().values());}
		return null;
	}
	
	@PUT
	@Path("/blokiraj")
	@Produces(MediaType.APPLICATION_JSON)
	public void blokiraj(Prodavac prodavac) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("ProdavacDAO");
		dao.blokiraj(prodavac);
	}
	@DELETE
	@Path("/obrisi")
	@Produces(MediaType.APPLICATION_JSON)
	public void obrisi(Prodavac prodavac) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("ProdavacDAO");
		dao.obrisi(prodavac);
	}

	@POST
	@Path("/exists")
	@Consumes({ MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac findOne(String username) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("ProdavacDAO");
		Prodavac u = dao.find(username);
		return u;
	}
	
	
}
