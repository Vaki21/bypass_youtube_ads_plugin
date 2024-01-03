using System;
using System.Data;
using System.Diagnostics;
using System.Net;
using System.Collections.Generic;
using System.IO; 
using System.Linq;
using System.Text;  
using System.Web;
using System.Xml;


StartServer();
Console.ReadKey();

static void StartServer()
{
    var httpListener = new HttpListener();
    var simpleServer = new SimpleServer(httpListener, "http://127.0.0.1:1234/", ProcessYourResponse);
    simpleServer.Start();
}

static byte[] ProcessYourResponse(string test)
{
    Console.WriteLine(test);

    if (File.Exists("video.mp4"))
    {
        File.Delete("video.mp4");
    }

    string Command = "yt-dlp --no-continue -P C:\\Users\\vakaracj\\source\\repos\\Bypass3\\bin\\Debug\\net8.0 -o video.mp4 https://www.youtube.com/" + test;
    ProcessStartInfo ProcessInfo;
    Process Process;

    ProcessInfo = new ProcessStartInfo("cmd.exe", "/C" + Command); //K
    //ProcessInfo.WindowStyle = ProcessWindowStyle.Hidden;
    ProcessInfo.Verb = "runas";
    ProcessInfo.UseShellExecute = true;
    //ProcessInfo.CreateNoWindow = true;

    Process = Process.Start(ProcessInfo);
    Process.WaitForExit();

    if (Process.HasExited)
    {
        Console.WriteLine("Creating HTML");
        StringBuilder sb = new StringBuilder();

        sb.Append("<!DOCTYPE html>");
        sb.Append("<html><head><meta charset='utf-8'/>");
        sb.Append("</head>");
        sb.Append("<body style='text-align: center;margin:auto;margin-top:0px;margin-bottom:5px;background-color:#0f0f0f;'>");
        sb.Append("<video id='vid' width=\"640\" height=\"480\" controls>");
        sb.Append("<source src='video.mp4' type=\"video/mp4\">");
        sb.Append("Your browser does not support the video tag.");
        sb.Append("</video>");
        sb.Append("<script>const video = document.querySelector(\"video\");\r\n\r\nvideo.addEventListener(\"ended\", (event) => {window.close();});</script>");
        sb.Append("</body>");
        sb.Append("</html>");

        StreamWriter sw1 = new StreamWriter(@"video.html");
        sw1.Write(sb);
        sw1.Flush();
        sw1.Close();
        sw1.Dispose();

        ProcessStartInfo ProcessInfo2;
        Process Process2;

        ProcessInfo2 = new ProcessStartInfo(@"cmd.exe ", @"/c " + "video.html");
        ProcessInfo2.UseShellExecute = true;
        Process2 = Process.Start(ProcessInfo2);
        
    }
    return new byte[0]; // TODO when you want return some response
}

void ExecuteCommand(string Command)
{
    ProcessStartInfo ProcessInfo;
    Process Process;

    ProcessInfo = new ProcessStartInfo("cmd.exe", "/K " + Command);
    ProcessInfo.CreateNoWindow = true;
    ProcessInfo.UseShellExecute = true;

    Process = Process.Start(ProcessInfo);
}