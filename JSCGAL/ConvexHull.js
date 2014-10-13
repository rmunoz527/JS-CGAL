/**
 * Created by rmunoz on 10/8/2014.
 */
function ConvexHull()
{
    var points = [];
    var hullPoints = [];
    // Stores upper hull points to be joined with lower to complete convexhull
    var hullUpper = [];

    this.AddPoints = function(p_points){points = p_points;}


    this.CreateHull = function()
    {
        points.sort(CompareX);
        if(points.length > 1) {
            hullUpper.push(points[0]);
            hullUpper.push(points[1]);
            for(var i = 2;i < points.length;i++)
            {
                var direction = ccw(points[i-1],points[i],points[i+1]);
                var temp = (direction <=0 && hullUpper.length > 1);
                hullUpper.push(points[i]);
                while((direction <=0 && hullUpper.length > 2)== true)
                {
                    var lastPoint = hullUpper.pop();
                    // remove middle
                    hullUpper.pop();
                    hullUpper.push(lastPoint);
                }
            }
        }

    }

    // Three points are a counter-clockwise turn if ccw > 0, clockwise if ccw < 0, and collinear if ccw = 0 because ccw is a
    // determinant that gives twice the signed area of the triangle formed by p1,p2, and p3.
    function ccw(p1,p2,p3)
    {
        var result = (p2.x - p1.x)*(p3.y - p1.y) - (p2.y - p1.y)*(p3.x - p1.x);
        return result;
    }

    function CompareX(a,b)
    {
        if(a.x < b.x)
            return -1;
        else if(a.x > b.x)
            return 1;
        else
            return 0;
    }

    function CompareY(a,b)
    {
        if(a.y < b.y)
            return -1;
        else if(a.y > b.y)
            return 1;
        else
            return 0;
    }

    function SortX()
    {
        this.points.sort(CompareX);
    }

    function SortY()
    {
        this.points.sort(CompareY);
    }






}