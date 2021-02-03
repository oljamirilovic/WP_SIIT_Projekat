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
import beans.Kupac;
import beans.Manifestacija;
import beans.Prodavac;
import dao.KartaDAO;
import dao.ProdavacDAO;

@Path("/sellers")
public class ProdavacServices {

	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;

	public ProdavacServices() {
	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("ProdavacDAO") == null) {
			String contextPath = ctx.getRealPath("");
			//ctx.setAttribute("ProdavacDAO", new ProdavacDAO(contextPath));  //ovo jenekako se prosledi
		}
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
	@Path("/pregledKupaca")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Kupac> getKupciOfProdavac(String username) {
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

}
