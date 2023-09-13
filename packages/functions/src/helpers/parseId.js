export default function parseId(string) {
  return parseInt(/[0-9]{10,}$/g.exec(string)[0]);
}
