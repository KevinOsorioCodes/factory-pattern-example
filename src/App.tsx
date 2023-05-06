import React, { ChangeEvent, FC, useState } from "react";

// Creamos nuestros componentes que serán utilizados en el Factory
export const ComponentA: FC = () => {
  return <div>Soy el Componente A</div>;
};

export const ComponentB: FC = () => {
  return <div>Soy el Componente B</div>;
};
export const DefaultComponent: FC = () => {
  return <div>Soy el Componente por defecto</div>;
};

// Definimos un enum con los tipos de componentes para mejor control
export enum ComponentType {
  A,
  B,
  C,
}

// Creamos un type para luego definir los componentes exactos que podrá renderizar nuestro factory
type Components = {
  [key in ComponentType]?: FC;
};

// Se definen los componentes del Factory en un objeto para mejor acceso
const components: Components = {
  [ComponentType.A]: ComponentA,
  [ComponentType.B]: ComponentB,
};

// Creamos nuestro Factory
export class ComponentFactory {
  // Función encargada de entregar el componente deseado segun un tipo de componente
  public static createComponent(type: ComponentType): React.ComponentType {
    const component = components[type];
    if (!component) {
      // Si no se encuentra el componente, devolvemos un componente por defecto
      return DefaultComponent;
    }

    return component;
  }
}

// Implementamos
const App: React.FC = () => {
  // Estado que contenga el tipo de componente a mostrar
  const [type, setType] = useState<ComponentType>(ComponentType.A);

  // Función que cambia el tipo de componente a mostrar
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = +event.target.value;
    setType(selected);
  };

  // Utiliza el Factory para obtener el componente correcto
  const Component = ComponentFactory.createComponent(type);

  return (
    <div>
      <h1>Ejemplo basico factory pattern</h1>
      {/* Usamos un selector que nos permita modificar el tipo de componente */}
      <select name="componentType" onChange={handleChange} value={type}>
        <option value={ComponentType.A}>Componente A</option>
        <option value={ComponentType.B}>Componente B</option>
        <option value={ComponentType.C}>Componente C</option>
      </select>
      {/* Se renderiza el componente con el patrón de diseño factory */}
      <Component />
    </div>
  );
};

export default App;
