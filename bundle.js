(function (React$1, ReactDOM, d3, topojson) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  const useWorldAtlas = () => {
    const [data, setData] = React$1.useState(null);

    React$1.useEffect(() => {
      d3.json(jsonUrl).then(topology => {
        const { countries, land } = topology.objects;
        setData({
          land: topojson.feature(topology, land),
          interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
        });
      });
    }, []);

    return data;
  };

  const csvUrl =
    'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';

  const row = (d) => {
    d.coords = d['Location Coordinates']
      .split(',')
      .map((d) => +d)
      .reverse();
    d['Total Dead and Missing'] = + d['Total Dead and Missing'];
    return d;
  };

  const useData = () => {
    const [data, setData] = React$1.useState(null);

    React$1.useEffect(() => {
      d3.csv(csvUrl, row).then(setData);
    }, []);

    return data;
  };

  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  const Marks = ({ worldAtlas: { land, interiors }, data,sizeScale,sizeValue }) => (
    React.createElement( 'g', { className: "marks" },
      React.createElement( 'path', { className: "sphere", d: path({ type: 'Sphere' }) }),
      React.createElement( 'path', { className: "graticules", d: path(graticule()) }),
      land.features.map(feature => (
        React.createElement( 'path', { className: "land", d: path(feature) })
      )),
      React.createElement( 'path', { className: "interiors", d: path(interiors) }),
      data.map(d => {
        const [x, y] = projection(d.coords);
       // console.log(projection(d.coords))
        return React.createElement( 'circle', { cx: x, cy: y, r: sizeScale(sizeValue(d)) },
        
          React.createElement( 'title', null, 'missing migrants : ' + d['Total Dead and Missing'] )
        )
      })
    )
  );

  const width = 960;
  const height = 500;

  const App = () => {
    const worldAtlas = useWorldAtlas();
    const data = useData();

    if (!worldAtlas || !data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }
    const sizeValue = (d) =>
      d['Total Dead and Missing'];
    const maxRadius = 15;
    const sizeScale = d3.scaleSqrt()
      .domain([0, d3.max(data, sizeValue)])
      .range([0, maxRadius]);

    return (
      React$1__default.createElement( 'svg', { width: width, height: height },
        React$1__default.createElement( Marks, {
          worldAtlas: worldAtlas, data: data, sizeScale: sizeScale, sizeValue: sizeValue })
      )
    );
  };
  const rootElement = document.getElementById(
    'root'
  );
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3, topojson));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZVdvcmxkQXRsYXMuanMiLCJ1c2VEYXRhLmpzIiwiTWFya3MuanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGpzb24gfSBmcm9tICdkMyc7XG5pbXBvcnQgeyBmZWF0dXJlLCBtZXNoIH0gZnJvbSAndG9wb2pzb24nO1xuXG5jb25zdCBqc29uVXJsID0gJ2h0dHBzOi8vdW5wa2cuY29tL3dvcmxkLWF0bGFzQDIuMC4yL2NvdW50cmllcy01MG0uanNvbic7XG5cbmV4cG9ydCBjb25zdCB1c2VXb3JsZEF0bGFzID0gKCkgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGpzb24oanNvblVybCkudGhlbih0b3BvbG9neSA9PiB7XG4gICAgICBjb25zdCB7IGNvdW50cmllcywgbGFuZCB9ID0gdG9wb2xvZ3kub2JqZWN0cztcbiAgICAgIHNldERhdGEoe1xuICAgICAgICBsYW5kOiBmZWF0dXJlKHRvcG9sb2d5LCBsYW5kKSxcbiAgICAgICAgaW50ZXJpb3JzOiBtZXNoKHRvcG9sb2d5LCBjb3VudHJpZXMsIChhLCBiKSA9PiBhICE9PSBiKVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3N2IH0gZnJvbSAnZDMnO1xuXG5jb25zdCBjc3ZVcmwgPVxuICAnaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9jdXJyYW4vYTk2NTZkNzExYThhZDMxZDgxMmI4Zjk5NjNhYzQ0MWMvcmF3LzI2N2VhYzhiOTdkMTYxYzQ3OWQ5NTBmZmFkM2RkZDVjZTJkMWYzNzAvTWlzc2luZ01pZ3JhbnRzLUdsb2JhbC0yMDE5LTEwLTA4VDA5LTQ3LTE0LXN1YnNldC5jc3YnO1xuXG5jb25zdCByb3cgPSAoZCkgPT4ge1xuICBkLmNvb3JkcyA9IGRbJ0xvY2F0aW9uIENvb3JkaW5hdGVzJ11cbiAgICAuc3BsaXQoJywnKVxuICAgIC5tYXAoKGQpID0+ICtkKVxuICAgIC5yZXZlcnNlKCk7XG4gIGRbJ1RvdGFsIERlYWQgYW5kIE1pc3NpbmcnXSA9ICsgZFsnVG90YWwgRGVhZCBhbmQgTWlzc2luZyddO1xuICByZXR1cm4gZDtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VEYXRhID0gKCkgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNzdihjc3ZVcmwsIHJvdykudGhlbihzZXREYXRhKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsImltcG9ydCB7IGdlb05hdHVyYWxFYXJ0aDEsIGdlb1BhdGgsIGdlb0dyYXRpY3VsZSB9IGZyb20gJ2QzJztcblxuY29uc3QgcHJvamVjdGlvbiA9IGdlb05hdHVyYWxFYXJ0aDEoKTtcbmNvbnN0IHBhdGggPSBnZW9QYXRoKHByb2plY3Rpb24pO1xuY29uc3QgZ3JhdGljdWxlID0gZ2VvR3JhdGljdWxlKCk7XG5cbmV4cG9ydCBjb25zdCBNYXJrcyA9ICh7IHdvcmxkQXRsYXM6IHsgbGFuZCwgaW50ZXJpb3JzIH0sIGRhdGEsc2l6ZVNjYWxlLHNpemVWYWx1ZSB9KSA9PiAoXG4gIDxnIGNsYXNzTmFtZT1cIm1hcmtzXCI+XG4gICAgPHBhdGggY2xhc3NOYW1lPVwic3BoZXJlXCIgZD17cGF0aCh7IHR5cGU6ICdTcGhlcmUnIH0pfSAvPlxuICAgIDxwYXRoIGNsYXNzTmFtZT1cImdyYXRpY3VsZXNcIiBkPXtwYXRoKGdyYXRpY3VsZSgpKX0gLz5cbiAgICB7bGFuZC5mZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiAoXG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJsYW5kXCIgZD17cGF0aChmZWF0dXJlKX0gLz5cbiAgICApKX1cbiAgICA8cGF0aCBjbGFzc05hbWU9XCJpbnRlcmlvcnNcIiBkPXtwYXRoKGludGVyaW9ycyl9IC8+XG4gICAge2RhdGEubWFwKGQgPT4ge1xuICAgICAgY29uc3QgW3gsIHldID0gcHJvamVjdGlvbihkLmNvb3Jkcyk7XG4gICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3Rpb24oZC5jb29yZHMpKVxuICAgICAgcmV0dXJuIDxjaXJjbGUgY3g9e3h9IGN5PXt5fSByPXtzaXplU2NhbGUoc2l6ZVZhbHVlKGQpKX0+XG4gICAgICBcbiAgICAgICAgPHRpdGxlPnsnbWlzc2luZyBtaWdyYW50cyA6ICcgKyBkWydUb3RhbCBEZWFkIGFuZCBNaXNzaW5nJ119PC90aXRsZT5cbiAgICAgIDwvY2lyY2xlPlxuICAgIH0pfVxuICA8L2c+XG4pO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgdXNlV29ybGRBdGxhcyB9IGZyb20gJy4vdXNlV29ybGRBdGxhcyc7XG5pbXBvcnQgeyB1c2VEYXRhIH0gZnJvbSAnLi91c2VEYXRhJztcbmltcG9ydCB7IE1hcmtzIH0gZnJvbSAnLi9NYXJrcyc7XG5pbXBvcnQgeyBzY2FsZVNxcnQsIG1heCB9IGZyb20gJ2QzJztcbmNvbnN0IHdpZHRoID0gOTYwO1xuY29uc3QgaGVpZ2h0ID0gNTAwO1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IHdvcmxkQXRsYXMgPSB1c2VXb3JsZEF0bGFzKCk7XG4gIGNvbnN0IGRhdGEgPSB1c2VEYXRhKCk7XG5cbiAgaWYgKCF3b3JsZEF0bGFzIHx8ICFkYXRhKSB7XG4gICAgcmV0dXJuIDxwcmU+TG9hZGluZy4uLjwvcHJlPjtcbiAgfVxuICBjb25zdCBzaXplVmFsdWUgPSAoZCkgPT5cbiAgICBkWydUb3RhbCBEZWFkIGFuZCBNaXNzaW5nJ107XG4gIGNvbnN0IG1heFJhZGl1cyA9IDE1O1xuICBjb25zdCBzaXplU2NhbGUgPSBzY2FsZVNxcnQoKVxuICAgIC5kb21haW4oWzAsIG1heChkYXRhLCBzaXplVmFsdWUpXSlcbiAgICAucmFuZ2UoWzAsIG1heFJhZGl1c10pO1xuXG4gIHJldHVybiAoXG4gICAgPHN2ZyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT5cbiAgICAgIDxNYXJrc1xuICAgICAgICB3b3JsZEF0bGFzPXt3b3JsZEF0bGFzfVxuICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICBzaXplU2NhbGU9e3NpemVTY2FsZX1cbiAgICAgICAgc2l6ZVZhbHVlPXtzaXplVmFsdWV9XG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICApO1xufTtcbmNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICdyb290J1xuKTtcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCByb290RWxlbWVudCk7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJqc29uIiwiZmVhdHVyZSIsIm1lc2giLCJjc3YiLCJnZW9OYXR1cmFsRWFydGgxIiwiZ2VvUGF0aCIsImdlb0dyYXRpY3VsZSIsIlJlYWN0Iiwic2NhbGVTcXJ0IiwibWF4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7RUFJQSxNQUFNLE9BQU8sR0FBRyx3REFBd0QsQ0FBQztBQUN6RTtFQUNPLE1BQU0sYUFBYSxHQUFHLE1BQU07RUFDbkMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHQSxnQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDO0VBQ0EsRUFBRUMsaUJBQVMsQ0FBQyxNQUFNO0VBQ2xCLElBQUlDLE9BQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJO0VBQ25DLE1BQU0sTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO0VBQ25ELE1B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