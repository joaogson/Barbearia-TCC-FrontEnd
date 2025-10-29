import Link from "next/link";
import "./perfil.css";
import { useAuth } from "../../contexts/AuthContext";

export default function ListPerfil() {
  const { user } = useAuth();

  return (
    <>
      <div className="informations-container">
        <div className="information-details">
          <Link className="button-actions" href="/Perfil/editar">
            editar
          </Link>
          <div className="information-card">
            <div className="information-block">
              <div className="information-header">Nome</div>
              <p className="label">{user?.name}</p>
            </div>

            <div className="information-block">
              <div className="information-header">Email</div>
              <p className="label"> {user?.email}</p>
            </div>

            <div className="information-block">
              <div className="information-header">Celular</div>
              <p className="label">{user?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
