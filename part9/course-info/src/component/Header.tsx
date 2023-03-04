const Header = ({courseName}: {courseName: string}) => {
  console.log('header props ->', courseName);
  return(
    <h1>{courseName}</h1>
  );
  
}

export default Header;